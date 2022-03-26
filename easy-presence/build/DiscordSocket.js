"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = void 0;
/* eslint-disable no-invalid-this */
const net_1 = require("net");
const util_1 = require("./util");
function createConnection(path, connectionListener) {
    const socket = net_1.createConnection(path, connectionListener);
    // eslint-disable-next-line @typescript-eslint/ban-types
    socket.writePacket = (opcode, data) => {
        data = JSON.stringify(data);
        const dlen = Buffer.byteLength(data);
        const buffer = Buffer.alloc(dlen + 8);
        buffer.writeUInt32LE(opcode, 0);
        buffer.writeUInt32LE(dlen, 4);
        buffer.write(data, 8);
        return socket.write(buffer);
    };
    let opcode = -1;
    let remaining = 0;
    let data = "";
    socket.on("readable", () => {
        if (!socket.readableLength)
            return;
        util_1.debug(socket.readableLength, "bytes available");
        if (opcode < 0) {
            const header = socket.read(8);
            opcode = header.readInt32LE(0);
            remaining = header.readInt32LE(4);
            util_1.debug("Got header", { opcode, remaining });
            const body = socket.read(remaining);
            remaining -= body.length;
            util_1.debug("Remaining bytes", remaining);
            data += body.toString();
        }
        else {
            const body = socket.read(remaining);
            remaining -= body.length;
            util_1.debug("Remaining bytes", remaining);
            data += body.toString();
        }
        if (remaining <= 0) {
            // debug("Data complete!", opcode, data);
            socket.emit("decodedPacket", opcode, data);
            opcode = -1;
            data = "";
        }
    });
    return socket;
}
exports.createConnection = createConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZFNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EaXNjb3JkU29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUFvQztBQUNwQyw2QkFBc0U7QUFFdEUsaUNBQStCO0FBb0IvQixTQUFnQixnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsa0JBQStCO0lBQzFFLE1BQU0sTUFBTSxHQUFHLHNCQUFtQixDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBa0IsQ0FBQztJQUM5RSx3REFBd0Q7SUFDeEQsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLE1BQWlCLEVBQUUsSUFBcUIsRUFBRSxFQUFFO1FBQzlELElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNsQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjO1lBQUUsT0FBTztRQUNuQyxZQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNaLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFXLENBQUM7WUFDeEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsWUFBSyxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7WUFDOUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekIsWUFBSyxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0I7YUFBTTtZQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7WUFDOUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekIsWUFBSyxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDaEIseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUEzQ0QsNENBMkNDIn0=