"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
const console_1 = require("console");
const path_1 = require("path");
const BaseEventEmitter_1 = require("./BaseEventEmitter");
const consts_1 = require("./consts");
const DiscordSocket_1 = require("./DiscordSocket");
const util_1 = require("./util");
class SocketManager extends BaseEventEmitter_1.BaseEventEmitter {
    constructor(clientId) {
        super(clientId);
        this.status = "disconnected";
        this.path = path_1.join((process.platform == "win32" ?
            "\\\\?\\pipe\\" :
            (process.env.XDG_RUNTIME_DIR || process.env.TMPDIR || process.env.TMP || process.env.TEMP || "/tmp")), "discord-ipc-");
        this.currentPresence = undefined;
        this.scheduledReconnect = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.waiting = new Map();
        this.on("disconnect", () => {
            if (!this.scheduledReconnect) {
                console_1.log("Scheduling connect");
                this.scheduledReconnect = true;
                setTimeout((() => {
                    console_1.log(this.currentPresence && (this.status == "errored" || this.status == "disconnected") ? "Running scheduled reconnect" : "Scheduled restart reconnect.");
                    if (this.currentPresence && (this.status == "errored" || this.status == "disconnected"))
                        this.connect();
                }).bind(this), 5000);
            }
        });
        this.connect().catch(() => { });
    }
    async connect() {
        util_1.debug("Starting connect");
        this.scheduledReconnect = false;
        if (this.status == "connected")
            return this.socket;
        this.status = "connecting";
        try {
            this.emit("connecting");
        }
        catch (e) { }
        for (let attempt = 0; attempt < 10; attempt++) {
            util_1.debug("Connection attempt #" + attempt);
            try {
                this.socket = await this.establishConnection(this.path + attempt);
                util_1.debug("Connection success!");
                this.status = "connected";
                try {
                    this.emit("connected");
                }
                catch (e) {
                    console.error(e);
                }
                return this.socket;
            }
            catch (e) {
                util_1.debug("Connection failed", e);
            }
        }
        this.status = "errored";
        try {
            this.emit("disconnected");
        }
        catch (e) {
            console.error(e);
        }
        throw new Error("Could not connect to IPC");
    }
    createSocket(path) {
        return new Promise((resolve, reject) => {
            try {
                util_1.debug("Attempting to connect to ", path);
                const socket = DiscordSocket_1.createConnection(path, () => {
                    util_1.debug("Connected to ", path);
                    this.removeListener("error", reject);
                    resolve(socket);
                });
                socket.on("error", reject);
            }
            catch (e) {
                util_1.debug("Failed to connect to", path, e);
                reject(e);
            }
        });
    }
    establishConnection(path) {
        return new Promise(async (resolve, reject) => {
            try {
                this.socket = await this.createSocket(path);
                util_1.debug("Writing handshake");
                this.socket.writePacket(consts_1.IPCOpcode.HANDSHAKE, { v: 1, client_id: this.clientId });
                let first = true;
                this.socket.once("decodedPacket", (opcode, data) => {
                    util_1.debug("First packet", opcode);
                    first = false;
                    if (opcode == consts_1.IPCOpcode.FRAME) {
                        this.environment = JSON.parse(data).data;
                        resolve(this.socket);
                    }
                    else {
                        reject(new Error(data));
                    }
                });
                this.socket.on("decodedPacket", (opcode, data) => {
                    this.emit("packet", opcode, data);
                    const j = JSON.parse(data);
                    util_1.debug("Got frame", j);
                    if (j.cmd == "SET_ACTIVITY") {
                        try {
                            this.emit("activityUpdate", j.data);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    try {
                        this.emit(j.cmd, j);
                    }
                    catch (e) {
                        console.error(e);
                    }
                    if (j.nonce && this.waiting.has(j.nonce)) {
                        this.waiting.get(j.nonce)(data);
                        this.waiting.delete(j.nonce);
                    }
                });
                this.socket.on("close", () => {
                    if (first)
                        reject(new Error("Connection closed."));
                    this.disconnect();
                });
            }
            catch (e) {
                util_1.debug("Error establishing connection to ", path, e);
                reject(e);
            }
        });
    }
    disconnect() {
        if (this.socket)
            this.socket.destroy();
        try {
            this.emit("disconnected");
        }
        catch (e) {
            console.error(e);
        }
        this.socket = null;
        this.status = "disconnected";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    request(cmd, args, evt) {
        let uuid = "";
        for (let i = 0; i < 32; i += 1) {
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += "-";
            }
            let n;
            if (i === 12) {
                n = 4;
            }
            else {
                const random = Math.random() * 16 | 0;
                if (i === 16) {
                    n = (random & 3) | 0;
                }
                else {
                    n = random;
                }
            }
            uuid += n.toString(16);
        }
        return new Promise((a, r) => {
            if (!this.socket.writePacket(consts_1.IPCOpcode.FRAME, { cmd, args, evt, nonce: uuid }))
                return r(new Error("Couldn't write."));
            this.waiting.set(uuid, (data) => a(data.data));
        });
    }
}
exports.SocketManager = SocketManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Tb2NrZXRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUE4QjtBQUM5QiwrQkFBNEI7QUFDNUIseURBQXNEO0FBQ3RELHFDQUFtRTtBQUNuRSxtREFBa0U7QUFDbEUsaUNBQStCO0FBRy9CLE1BQWEsYUFBYyxTQUFRLG1DQUFnQjtJQWlCL0MsWUFBWSxRQUFnQjtRQUN4QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFoQnBCLFdBQU0sR0FBNEQsY0FBYyxDQUFDO1FBQ2pGLFNBQUksR0FBRyxXQUFJLENBQ1AsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLGVBQWUsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQ3ZHLEVBQ0QsY0FBYyxDQUNqQixDQUFFO1FBQ0gsb0JBQWUsR0FBeUIsU0FBUyxDQUFDO1FBQ2xELHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQiw4REFBOEQ7UUFDOUQsWUFBTyxHQUFvQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBTWpELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMxQixhQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDL0IsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUNiLGFBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFD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