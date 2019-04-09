const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', function (message) {
    if (message.content === 'fanta') {
    const voc = message.member.voiceChannel
    console.log(voc)

    if (typeof(voc) !== 'undefined'){
    voc.join()
    .then(connection => {connection.playFile('./tg.mp3').on('end', function() {connection.disconnect()})})
 }
}
});

client.on('message', function (message) {
    if (message.content === '007') {
    const voc = message.member.voiceChannel
    console.log(voc)

    if (typeof(voc) !== 'undefined'){
    voc.join()
    .then(connection => {connection.playFile('./007.mp3').on('end', function() {connection.disconnect()})})
 }
}
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
