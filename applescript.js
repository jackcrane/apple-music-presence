var applescript = require("applescript");
var { writeFileSync } = require("fs");
const { Upload } = require("./s3");

// Very basic AppleScript command. Returns the song name of each
// currently selected track in iTunes as an 'Array' of 'String's.
// var script = 'tell application "Music" to get properties of current track';
var script = `tell application "Music" to tell artwork 1 of current track
return data
end tell`;

const ExecuteAppleScript = async () => {
  return new Promise((resolve, reject) => {
    applescript.execString(script, function (err, artwork) {
      if (err) {
        // Something went wrong!
        console.log(err);
      }
      applescript.execString(
        `tell application "Music" to get properties of current track`,
        async (err, song) => {
          let songObj = {};
          song.forEach((s) => {
            if (typeof s === "string") {
              let [key, value] = s.split(":");
              songObj[key] = value ? value.split('"').join("") : null;
            }
          });
          const upload = await Upload({
            song: songObj.name,
            artist: songObj.artist,
            body: artwork,
          });
          resolve({
            // s3up: upload,
            url:
              "https://jack-general.nyc3.digitaloceanspaces.com/apple-music-rich-presence/" +
              encodeURI(songObj.name.replaceAll("/", "")).slice(0, 100) +
              "-" +
              encodeURI(songObj.artist.replaceAll("/", "")).slice(0, 100) +
              ".jpeg",
            song: songObj.name,
            artist: songObj.artist,
            album: songObj.album,
          });
        }
      );
    });
  });
};

module.exports = { ExecuteAppleScript };
