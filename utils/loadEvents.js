const fs = require('fs');

module.exports = bot => {
    fs.readdir("events/", (_err, files) => {
        files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];
            bot.on(eventName, event.bind(null, bot));
            delete require.cache[require.resolve(`../events/${file}`)];
        });
    });
 }