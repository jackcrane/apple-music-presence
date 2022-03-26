const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const { readFileSync } = require("fs");
require("dotenv").config();

const s3Client = new S3({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  },
});

const Upload = async ({ song, artist, body }) => {
  const BucketParams = {
    Bucket: "jack-general",
    Key: `apple-music-rich-presence/${song}-${artist}.jpeg`,
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
