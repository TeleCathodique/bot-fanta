const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('prêt !');

});

var sons = ['007','fanta','aieaieouille','navarro','foutre','honteux','sel','merde','pan','mauvais','putain','karaba']


client.on('message', function (message) {
    if (sons.includes(message.content) === true && client.voiceConnections.size === 0 ) {
    const voc = message.member.voiceChannel
    console.log(client.user)
    if (typeof(voc) !== 'undefined'){
    voc.join()
    .then(connection => {connection.playFile('./'+message.content+'.mp3').on('end', function() {connection.disconnect()})})
 }
}
});


client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
