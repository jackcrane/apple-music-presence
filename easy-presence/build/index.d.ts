import { Activity, ResponseActivity } from "./consts";
import { SocketManager } from "./SocketManager";
export declare interface EasyPresence {
    on(event: "disconnected", listener: () => void): this;
    on(event: "conneting", listener: () => void): this;
    on(event: "packet", listener: (opcode: number, data: string) => void): this;
    on(event: "connected", listener: () => void): this;
    on(event: "activityUpdate", listener: (activity: ResponseActivity | undefined) => void): this;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
}
export declare class EasyPresence extends SocketManager {
    currentPresence: Activity | undefined;
    actualPresence: ResponseActivity | undefined;
    queuedPresence: boolean;
    cooldown: boolean;
    constructor(clientId: string);
    setActivity(presence: Activity | undefined): Promise<void>;
}
