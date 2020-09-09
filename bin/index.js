#!/usr/bin/env node

let default_cfg = {
    host: 'localhost',
    port: 25565,
    throttle_delay: 1000,
    bot_count: 50,
    version: false
}



const mineflayer = require('mineflayer');
const chalk = require('chalk');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')();
const print = console.log;
const bot = require('./bot.js');
const sleep = require('./utils.js');

let args = process.argv.splice(2);


app.use(express.static(__dirname + '/../dist'));

app.listen(5080, () => {
    print(
        `
        ███████╗░█████╗░██████╗░░█████╗░███████╗  ██████╗░░█████╗░██╗██████╗░
        ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝  ██╔══██╗██╔══██╗██║██╔══██╗
        █████╗░░██║░░██║██████╔╝██║░░╚═╝█████╗░░  ██████╔╝███████║██║██║░░██║
        ██╔══╝░░██║░░██║██╔══██╗██║░░██╗██╔══╝░░  ██╔══██╗██╔══██║██║██║░░██║
        ██║░░░░░╚█████╔╝██║░░██║╚█████╔╝███████╗  ██║░░██║██║░░██║██║██████╔╝
        ╚═╝░░░░░░╚════╝░╚═╝░░╚═╝░╚════╝░╚══════╝  ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═════╝░`
    )

    print('\n\n\n\n\n');

    print(`Fire up your browser and visit ${chalk.blueBright('https://forceraidgui.vercel.app')}!`);

})

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    next();
  });

app.use(express.json());

app.get('/ping', (req, res) => {
    res.status(200).send({success: true});
})

app.post('/raid', (req, res) => {
    try {
        bot.startRaid(req.body);
    } catch(err) {
        res.sendStatus(500);
        console.error(chalk.red('Error: ' + err))
    } finally {
        res.sendStatus(200);
    }
})

app.post('/stopRaid', (req, res) => {
    res.sendStatus(200);
    bot.stopRaid();
})