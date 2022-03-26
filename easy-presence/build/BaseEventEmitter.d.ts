/// <reference types="node" />
import EventEmitter from "events";
export declare class BaseEventEmitter extends EventEmitter {
    clientId: string;
    constructor(clientId: string);
    emit(eventName: string | symbol, ...args: any[]): boolean;
}
