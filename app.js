process.env = {
  ...process.env,
  ...require("./envHandler"),
};

const { version } = require("./package.json");

var request = require("request");
var options = {
  method: "GET",
  url: "https://raw.githubusercontent.com/jackcrane/apple-music-presence/master/version.txt",
  headers: {},
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  if (response.body !== version) {
    console.log(
      chalk.red("🚨 Update available! Visit"),
      chalk.green("https://github.com/jackcrane/apple-music-presence/"),
      chalk.red("to download the latest version.")
    );
  }
});

const { ExecuteAppleScript } = require("./applescript");
require("dotenv").config();

const open = require("open");
open(
  "https://www.buymeacoffee.com/jackcrane/discord-x-apple-music-rich-presence"
);

const chalk = require("chalk");

console.log(
  "🎧 Starting up! This is a free, open source project, but donations are appreciated at",
  chalk.yellow("https://www.buymeacoffee.com/jackcrane")
);

let connected = false;

let client;
let connectInterval = setInterval(() => {
  console.log("🏋️‍♂️ Not connected, trying to connect...");
  client = new (require("./easy-presence/build/index").EasyPresence)(
    process.env.DISCORD_KEY
  );
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
        "🎺 New Song! " +
          _globalSongInfo.song +
          " by " +
          _globalSongInfo.artist +
          ".",
        "As always, donations appreciated!",
        chalk.yellow("https://www.buymeacoffee.com/jackcrane")
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
