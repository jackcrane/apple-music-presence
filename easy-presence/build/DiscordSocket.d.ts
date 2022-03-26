/// <reference types="node" />
import { Socket } from "net";
import { IPCOpcode } from "./consts";
export interface DiscordSocket extends Socket {
    on(event: string, listener: (...args: any[]) => void): this;
    on(event: "close", listener: (hadError: boolean) => void): this;
    on(event: "connect", listener: () => void): this;
    on(event: "data", listener: (data: Buffer) => void): this;
    on(event: "drain", listener: () => void): this;
    on(event: "end", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "lookup", listener: (err: Error, address: string, family: string | number, host: string) => void): this;
    on(event: "ready", listener: () => void): this;
    on(event: "timeout", listener: () => void): this;
    on(event: "decodedPacket", listener: (opcode: number, data: string) => void): this;
    writePacket(opcode: IPCOpcode, data: any): boolean;
}
export declare function createConnection(path: string, connectionListener?: () => void): DiscordSocket;
