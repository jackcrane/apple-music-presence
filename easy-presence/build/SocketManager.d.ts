import { BaseEventEmitter } from "./BaseEventEmitter";
import { Activity, DiscordEnvironment } from "./consts";
import { DiscordSocket } from "./DiscordSocket";
export declare class SocketManager extends BaseEventEmitter {
    socket: DiscordSocket;
    status: "connected" | "disconnected" | "errored" | "connecting";
    path: string;
    currentPresence: Activity | undefined;
    scheduledReconnect: boolean;
    waiting: Map<string, (data: any) => void>;
    environment?: DiscordEnvironment;
    constructor(clientId: string);
    connect(): Promise<DiscordSocket>;
    createSocket(path: string): Promise<DiscordSocket>;
    establishConnection(path: string): Promise<DiscordSocket>;
    disconnect(): void;
    request(cmd: string, args?: any, evt?: string): Promise<any>;
}
