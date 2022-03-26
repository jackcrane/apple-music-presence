"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyPresence = void 0;
const SocketManager_1 = require("./SocketManager");
const util_1 = require("./util");
class EasyPresence extends SocketManager_1.SocketManager {
  constructor(clientId) {
    super(clientId);
    this.currentPresence = undefined;
    this.actualPresence = undefined;
    this.queuedPresence = false;
    this.cooldown = false;
    this.on(
      "disconnected",
      (() => {
        this.actualPresence = undefined;
      }).bind(this)
    );
    this.on(
      "connected",
      (() => {
        this.actualPresence = undefined;
      }).bind(this)
    );
    this.on(
      "activityUpdate",
      ((activity) => {
        this.actualPresence = activity;
      }).bind(this)
    );
  }
  async setActivity(presence) {
    util_1.debug("setActivity(", presence);
    if (!util_1.activityDiffers(presence, this.actualPresence)) {
      util_1.debug("Ignoring duplicate.");
      this.currentPresence = presence;
      return;
    }
    if (this.cooldown) {
      this.currentPresence = presence;
      this.queuedPresence = true;
      return;
    }
    this.cooldown = true;
    // try {
    if (presence && this.status != "connected") await this.connect();
    if (presence && this.status != "connected")
      throw new Error("Status did not become connected.");
    if (this.status == "connected") {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const payload = { pid: process.pid };
      if (presence) {
        if (presence.timestamps) {
          if (presence.timestamps.end instanceof Date)
            presence.timestamps.end = presence.timestamps.end.getTime();
          if (presence.timestamps.start instanceof Date)
            presence.timestamps.start = presence.timestamps.start.getTime();
        }
        payload.activity = presence;
      }
      this.request("SET_ACTIVITY", payload);
    }
    // } catch (e) {
    //   throw new Error(
    //     "EasyPresence couldn't set activity. Trying again in a few.",
    //     e
    //   );
    // }
    setTimeout(
      (() => {
        this.cooldown = false;
        if (this.queuedPresence) {
          this.queuedPresence = false;
          this.setActivity(this.currentPresence);
        }
      }).bind(this),
      15000
    );
  }
}
exports.EasyPresence = EasyPresence;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbURBQWdEO0FBQ2hELGlDQUFnRDtBQWtCaEQsTUFBYSxZQUFhLFNBQVEsNkJBQWE7SUFLM0MsWUFBWSxRQUFnQjtRQUN4QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFMcEIsb0JBQWUsR0FBeUIsU0FBUyxDQUFDO1FBQ2xELG1CQUFjLEdBQWlDLFNBQVMsQ0FBQztRQUN6RCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNELEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBOEI7UUFDNUMsWUFBSyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsc0JBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ2pELFlBQUssQ0FBQyxxQkFBcUIs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
