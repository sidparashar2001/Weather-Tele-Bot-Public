const { Telegraf } = require('telegraf')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Used dotenv to hide or secret keys
require("dotenv").config()
const bot = new Telegraf(process.env.BOT_TOKEN)


try {
    // So when you /start command it will hit it 
    bot.start((ctx) => ctx.reply("Welcome to Siddharth's BOT"));

    // By using bot.command we are making our custom command
    bot.command("get", async (ctx) => {
        const cityName = ctx.payload;
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPEN_WEATHER_API}&units=metric`);
        const response = await data.json();
        ctx.reply(`City : ${response.name}\nTempearture : ${response.main.temp}C`);

    });
    bot.on("text", (ctx) => {
        if (ctx.update.message.text
            == "I love you") {
            ctx.reply("Love you too bro");
        }
        else {
            ctx.reply("I don't understand humans");
        }
    });


    // so when someone send us sticker this will hit, and this one is already defined in npm doc of telegraf
    bot.on("sticker", (ctx) => ctx.reply('🎉'));

    bot.launch();
} catch {
    console.log("Unexpected Command");
}