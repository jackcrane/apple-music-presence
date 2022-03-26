"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventEmitter = void 0;
const events_1 = __importDefault(require("events"));
const util_1 = require("./util");
class BaseEventEmitter extends events_1.default {
    constructor(clientId) {
        super();
        util_1.debug("Instantiated with ", clientId);
        this.clientId = clientId;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(eventName, ...args) {
        util_1.debug(eventName, ...args);
        return super.emit(eventName, ...args);
    }
}
exports.BaseEventEmitter = BaseEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUV2ZW50RW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9CYXNlRXZlbnRFbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUFrQztBQUNsQyxpQ0FBK0I7QUFFL0IsTUFBYSxnQkFBaUIsU0FBUSxnQkFBWTtJQUU5QyxZQUFZLFFBQWdCO1FBQ3hCLEtBQUssRUFBRSxDQUFDO1FBQ1IsWUFBSyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFDRCw4REFBOEQ7SUFDOUQsSUFBSSxDQUFDLFNBQTBCLEVBQUUsR0FBRyxJQUFXO1FBQzNDLFlBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMxQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBWkQsNENBWUMifQ==