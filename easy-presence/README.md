# EasyPresence

Discord Rich Presence, made easy!

## Why EasyPresence?

 - Reliable
   - EasyPresence was built with one purpose, rich presence, batteries included. Thanks to this, a lot of code (such as automatic reconnection, ratelimiting) is built directly in.
 - Simple
   - You only have to add 1 line of code to your project to get working rich presence. It's really that simple.
 - Light
   - EasyPresence has **0** dependencies, and has a bundle size of 30kb (unminified).
 - Typed
   - EasyPresence is written in pure TypeScript, and therefore has typings straight out of the box.

## Example

### One-liner

```js
(new (require("easy-presence").EasyPresence)("878603502048411648")).setActivity({
        details: "Using EasyPresence",
        state: "neato!",
});
```
### Advanced
```js
const client = new (require("easy-presence").EasyPresence)("878603502048411648"); // replace this with your Discord Client ID.
client.on("connected", () => {
    console.log("Hello,", client.environment.user.username);
});

// This will be logged when the presence was sucessfully updated on Discord.
client.on("activityUpdate", (activity) => {
    console.log("Now you're playing", activity ? activity.name : "nothing!")
});

setInterval(() => {
    client.setActivity({
        details: "Using EasyPresence",
        state: "neato!",
        assets: {
            large_image: "rblxrp",
            large_text: "EasyPresence",
            small_image: "octocat",
            small_text: "https://github.com/rblxrp/easypresence"
        },
        buttons: [
            {
                label: "Visit on GitHub",
                url: "https://github.com/rblxrp/easypresence"
            }
        ],
        party: {
            id: "1234567890",
            size: [1, 10]
        },
        timestamps: { start: new Date() }
    });
}, 1000);
```