<h1 align="center">

Apple Music Presence

</h1>

![Build passing](https://img.shields.io/badge/build-passing-brightgreen)
[![Bmac link](https://img.shields.io/badge/support-buy%20me%20a%20coffee-yellow)](https://buymeacoffee.com/jackcrane)

Connect Apple music with Discord!

We all have friends who have Spotify (gross), but it shows what they are listening to in Discord! Being an apple music user, I felt left out so implemented it myself!

![Preview](./preview.png)

## Features

- Easy startup
- Extremely lightweight
- No API keys required
- No dependencies
- Easy setup
- Display song name
- Display album art
- Display artist name
- Display album name

# Installation

Download the latest release from the releases page. There are 3 options. You want to select `apple-music-presence.zip` with the little cube icon, NOT either of the source code folders. This will download a zip file with the latest release.

Unzip the folder.

To run the program, simply right-click on `apple-music-presence` inside the unzipped folder and select 'Open'. MacOS will warn you that this is from an unidentified developer, and if you trust me, just click on 'Open'. If you don't trust me and know your way around code, you can build it yourself.

If you want to, you can [add this program to your Mac's startup file](https://support.apple.com/guide/mac-help/open-items-automatically-when-you-log-in-mh15189/mac#:~:text=Add%20or%20remove,then%20click%20Add.).

# Building from source

To build from source, you need to clone the repository and install the dependencies with `npm install`.

You will also need to set up a `.env` file with 3 keys:

```
DISCORD_KEY=<<your discord api key>>
S3_ACCESS_KEY=<<your aws s3 access key>>
S3_SECRET=<<your aws s3 secret key>>
```

NOTE All of the s3 handling happens in s3.js (and is actually set up to work with DigitalOcean Spaces). You will need to change the bucket config, as well as the url in the resolve callback in applescript.js. This is a horrible way of dealing with this, but tough.

You will also need to install `pkg` and `modclean`

```
npm i -g pkg
```

```
npm i -g modclean
```

Now, you can simply run `npm rum build` to build your own version of apple-music-presence.

# Alternatives

### Apple-Music-RPC

https://github.com/rohilpatel1/Apple-Music-RPC

This app requires you to have python and nodejs installed and configured, as well as needing you to run command-line scripts to make it executable.

Cannot display album art.

### iTunes Rich Presence

https://itunesrichpresence.com/

There is only a windows version availible.

Cannot display album art.
