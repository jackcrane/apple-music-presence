const { ExecuteAppleScript } = require("./applescript");
require("dotenv").config();

let connected = false;

let client;
let connectInterval = setInterval(() => {
  console.log("🏋️‍♂️ Not connected, trying to connect...");
  client = new (require("./easy-presence/build/index").EasyPresence)(
  process.env.DISCORD_KEY
); // replace this with your Discord Client ID.
client.on("connected", () => {
    connected = true;
    clearInterval(connectInterval);
    console.log("📶 Discord connected!");
    runTheRest();
});
}, 1000);

const runTheRest = async () => {
// This will be logged when the presence was sucessfully updated on Discord.
  client.on("activityUpdate", (activity) => {});

let globalSongInfo = {};

setInterval(async () => {
    const _globalSongInfo = await ExecuteAppleScript();
    if (_globalSongInfo.song !== globalSongInfo.song) {
      console.log(
        "🎺 New Song! " + _globalSongInfo.song + " by " + _globalSongInfo.artist
      );
      globalSongInfo = _globalSongInfo;
    }
}, 1000);

setInterval(async () => {
  if (globalSongInfo.song) {
      try {
        await client.setActivity({
      details: globalSongInfo.song,
      state: globalSongInfo.artist + " | " + globalSongInfo.album,
      assets: {
        large_image: encodeURI(globalSongInfo.url),
        large_text: globalSongInfo.song,
      },
    });
      } catch (err) {
        console.log("🚨 Discord disconnected");
      }
  }
}, 1000);
};
