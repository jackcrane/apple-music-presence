const { ExecuteAppleScript } = require("./applescript");
require("dotenv").config();
const client = new (require("easy-presence").EasyPresence)(
  process.env.DISCORD_KEY
); // replace this with your Discord Client ID.
client.on("connected", () => {
  console.log("Hello,", client.environment.user.username);
});

// This will be logged when the presence was sucessfully updated on Discord.
client.on("activityUpdate", (activity) => {
  console.log(activity);
  console.log("Now you're playing", activity ? activity.name : "nothing!");
});

let globalSongInfo = {};

setInterval(async () => {
  globalSongInfo = await ExecuteAppleScript();
}, 1000);

let url =
  "https://jack-general.nyc3.cdn.digitaloceanspaces.com/apple-music-rich-presence/Follow%20You-Imagine%20Dragons.jpeg";
setInterval(async () => {
  // console.log(globalSongInfo);
  if (globalSongInfo.song) {
    client.setActivity({
      details: globalSongInfo.song,
      state: globalSongInfo.artist + " | " + globalSongInfo.album,
      assets: {
        large_image: encodeURI(globalSongInfo.url),
        large_text: globalSongInfo.song,
      },
    });
  }
}, 1000);
