"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityDiffers = exports.debug = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function debug(...args) {
    if (!process.env["EZP-DEBUG"])
        return;
    console.debug("[EZP]", ...args);
}
exports.debug = debug;
function activityDiffers(a, b) {
    if (typeof a !== typeof b)
        return true;
    if (!a || !b)
        return false;
    if (a.state !== b.state)
        return true;
    if (a.details !== b.details)
        return true;
    if (a.instance !== b.instance)
        return true;
    if (JSON.stringify([a.timestamps, a.assets, a.party, a.buttons]) != JSON.stringify([b.timestamps, b.assets, b.party, b.buttons]))
        return true;
    return false;
}
exports.activityDiffers = activityDiffers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlIQUFpSDtBQUNqSCxTQUFnQixLQUFLLENBQUMsR0FBRyxJQUFXO0lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUFFLE9BQU87SUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBSEQsc0JBR0M7QUFFRCxTQUFnQixlQUFlLENBQUMsQ0FBVyxFQUFFLENBQVc7SUFDcEQsSUFBSSxPQUFPLENBQUMsS0FBSyxPQUFPLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUN2QyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzNCLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3JDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3pDLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsUUFBUTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzNDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUM5SSxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBUkQsMENBUUMifQ==