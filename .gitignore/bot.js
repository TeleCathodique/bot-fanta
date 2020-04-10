const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('prêt !');

});

var sons = ['007','fanta','aieaieouille','navarro','foutre','honteux','sel','merde','pan','mauvais','putain','karaba','fun','dansledos','chialer','salut','étrangler','STONKS']


client.on('message', function (message) {
 

 
    if (sons.includes(message.content) === true && client.voiceConnections.size === 0 ) {
    const voc = message.member.voiceChannel
    console.log(client.user)
    if (typeof(voc) !== 'undefined'){
    voc.join()
    .then(connection => {connection.playFile('./'+message.content+'.mp3').on('end', function() {connection.disconnect()})})
 }
}
   if (message.content === 'fantaliste') {
    message.channel.send (sons)
    message.channel.send (message.author.tag.split('#')[1])
   }
 
     if (message.content === 'STONKS') {
    message.channel.send ('https://tenor.com/view/stonks-up-stongs-meme-stocks-gif-15715298')
   }
 
 var punis = ['9443','8413']
 if (punis.includes(message.author.tag.split('#')[1])){
     var rol = message.member.roles.find(role => role.name === "Roi Des Forains")
     var rols = message.member.roles
     var mem = message.member
     console.log(rol)
     console.log(rols)
     console.log(mem)
     //message.channel.send (rol.name)
     }

   
   const mots = message.content.split(' ; ')
    if (mots[0] === 'fanta renomme'){
        const gugus = (message.guild.members.find(function(membre){return membre.nickname.toLocaleLowerCase() === mots[1].toLocaleLowerCase()}))
        console.log(gugus)
        if (gugus !== null){
            gugus.setNickname(mots[2])
        }
    }
    
});




client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
