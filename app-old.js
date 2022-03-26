const client = new (require("easy-presence").EasyPresence)(
  "957068833305264188"
); // replace this with your Discord Client ID.

const { ExecuteAppleScript } = require("./applescript");

client.on("connected", () => {
  console.log("Hello,", client.environment.user.username);
});

client.on("activityUpdate", (activity) => {
  console.log("Now you're playing", activity ? activity.name : "nothing!");
});

setInterval(async () => {
  let { url, song, artist, album } = await ExecuteAppleScript();
  console.log(url);
  await client.setActivity({
    details: "Song",
    state: "artist",
    assets: {
      // large_image: "data:image/jpeg;base64," + base64data,
      large_text: "EasyPresence",
      small_image: "octocat",
      small_text: "https://github.com/rblxrp/easypresence",
    },
    timestamps: { start: new Date() },
  });
}, 5000);
