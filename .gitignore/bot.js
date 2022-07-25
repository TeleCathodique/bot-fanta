const Discord = require('discord.js');

const client = new Discord.Client();

var boolcompteur = true;
var boolroleupdate = false;

client.on('ready', () => {

    console.log('prêt !');

});

client.on("roleUpdate", function(oldRole, newRole){
    console.log("roleUpdate");
    if (boolroleupdate){
    var to = client.uptime
      console.log(client.uptime)
      boolcompteur = false
      while(boolcompteur === false){
       if (client.uptime - to > 10000){boolcompteur = true; console.log(client.uptime-to)}
      }
    newRole.setPermissions([//'ADMINISTRATOR',
                         //'CREATE_INSTANT_INVITE',
                         //'KICK_MEMBERS',
                         //'BAN_MEMBERS',
                         //'MANAGE_CHANNELS',
                         //'MANAGE_GUILD',
                         //'ADD_REACTIONS',
                         //'VIEW_AUDIT_LOG',
                         //'PRIORITY_SPEAKER',
                         //'STREAM',
                         //'VIEW_CHANNEL',
                         'SEND_MESSAGES',
                         //'SEND_TTS_MESSAGES',
                         //'MANAGE_MESSAGES',
                         //'EMBED_LINKS',
                         //'ATTACH_FILES',
                         //'READ_MESSAGE_HISTORY',
                         //'MENTION_EVERYONE',
                         //'USE_EXTERNAL_EMOJIS',
                         //'VIEW_GUILD_INSIGHTS',
                         //'CONNECT',
                         //'SPEAK',
                         //'MUTE_MEMBERS',
                         //'DEAFEN_MEMBERS',
                         //'MOVE_MEMBERS',
                         //'USE_VAD',
                         //'CHANGE_NICKNAME',
                         //'MANAGE_NICKNAMES',
                         //'MANAGE_ROLES',
                         //'MANAGE_WEBHOOKS',
                         //'MANAGE_EMOJIS'
                       ])
        boolroleupdate = false
     console.log('fin while')}
});

var sons = ['007','fanta','aieaieouille','navarro','foutre','honteux','sel','merde','pan','mauvais','putain','karaba','fun','dansledos','chialer','salut','étrangler','STONKS','gus','sardoche'];


client.on('message', function (message) {
 
    console.log(message);
 
    if (sons.includes(message.content) === true && client.voiceConnections.size === 0 ) {
    const voc = message.member.voiceChannel;
    //console.log(client.user);
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
    
    if (message.content === 'gus') {
    message.channel.send ('https://tenor.com/view/gussdx-cdf-le-rat-gif-13667445')
   }
 
 
 var punis = ['1111']
 if (punis.includes(message.author.tag.split('#')[1]) && boolcompteur === true){
     var rol = message.member.roles.find(role => role.name !== "@everyone")
     console.log("entrée boucle");
     boolroleupdate = true
     
     rol.setPermissions(0);
       }

   
   const mots = message.content.split(' ; ')

    if (mots[0] === 'fanta renomme'){
        const gugus = (message.guild.members.find(function(membre){return membre.nickname.toLocaleLowerCase() === mots[1].toLocaleLowerCase()}))
        //console.log(gugus)
        if (gugus !== null){
            gugus.setNickname(mots[2])
        }
    }

    const motsEsp = message.content.split(' ')
    console.log(motsEsp);

    if (motsEsp[0] === 'shifumi'){
        message.channel.send ('Shifumi entre '+motsEsp[1]+' et '+motsEsp[2]+' !')
    }
    
}
);




client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
