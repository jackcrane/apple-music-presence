const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const { readFileSync } = require("fs");
require("dotenv").config();

const s3Client = new S3({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

const Upload = async ({ song, artist, body }) => {
  const BucketParams = {
    Bucket: "jack-general",
    Key: `apple-music-rich-presence/TESTING--${encodeURI(
      song.replaceAll("/", "")
    ).slice(0, 100)}-${encodeURI(artist.replaceAll("/", "")).slice(
      0,
      100
    )}.jpeg`,
    Body: body,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    ACL: "public-read",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(BucketParams));
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { Upload };

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    // If a regex pattern
    if (
      Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
    ) {
      return this.replace(str, newStr);
    }

    // If a string
    return this.replace(new RegExp(str, "g"), newStr);
  };
}
