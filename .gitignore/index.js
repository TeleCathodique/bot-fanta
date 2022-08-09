const Discord = require('discord.js');

const { joinVoiceChannel, VoiceConnectionStatus } = require('@discordjs/voice');

const { createAudioPlayer, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

const { SlashCommandBuilder } = require("@discordjs/builders");

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

//////////////////////////////////////////////////////////////////////////////// Variables Shifumi

var ShifumiEnCours = false;

class JoueurShifumi{
	constructor(member ='personne',coup = '',Ajoue = false){
		this.member=member;
		this.coup=coup;
		this.Ajoue=Ajoue;
	}
}

var JS1 = new JoueurShifumi()
var JS2 = new JoueurShifumi()

function CalculShifumi(JSA,JSB){
    if(JSA.coup === JSB.coup){return('Egalité')};
    if(JSA.coup === 'Pierre' && JSB.coup === 'Feuille'){return(JSB)};
    if(JSA.coup === 'Pierre' && JSB.coup === 'Ciseaux'){return(JSA)};
    if(JSA.coup === 'Feuille' && JSB.coup === 'Pierre'){return(JSA)};
    if(JSA.coup === 'Feuille' && JSB.coup === 'Ciseaux'){return(JSB)};
    if(JSA.coup === 'Ciseaux' && JSB.coup === 'Pierre'){return(JSB)};
    if(JSA.coup === 'Ciseaux' && JSB.coup === 'Feuille'){return(JSA)};
}

//////////////////////////////////////////////////////////////////////////////// Création liste sons

var fs = require('fs');
var files = fs.readdirSync('./audios/');

//console.log(files);

var sons = files.map(function(NomFichier){
    let mots = NomFichier.split(".");
    return mots[0];
})

//console.log(sons);

//////////////////////////////////////////////////////////////////////////////// Création client et player



const client = new Discord.Client({intents: 131071});

const player = createAudioPlayer({
	behaviors: {
		noSubscriber: NoSubscriberBehavior.Pause,
	},
});


//////////////////////////////////////////////////////////////////////////////// Création commande jouer

const datajouer = new SlashCommandBuilder()
    .setName("jouer")
    .setDescription("joue un audio")
    .addStringOption(option =>
		option.setName('audio')
			.setDescription('Nom de l\'audio')
			.setRequired(true)
			);



for (const son of sons){
    datajouer.options[0].addChoices(
        { name: son, value: son },
    );
};

//////////////////////////////////////////////////////////////////////////////// Création commande Shifumi

const datashifumi = new SlashCommandBuilder()
    .setName("shifumi")
    .setDescription("lance un shifumi entre deux joueurs")
    .addUserOption(option =>
        option.setName('j1')
        .setDescription('joueur 1')
        .setRequired(true))
    .addUserOption(option =>
        option.setName('j2')
        .setDescription('joueur 2')
        .setRequired(true));



//////////////////////////////////////////////////////////////////////////////// Création commande stop Shifumi

const datastop = new SlashCommandBuilder()
.setName("stop_shifumi")
.setDescription("annule le shifumi en cours")


//////////////////////////////////////////////////////////////////////////////// Initialisation



client.on('ready', () => {

    // var IdServeur = "460516066859417612"; //test
	
    var IdServeur = "306158324733181952"; //longueV


    client.guilds.cache.get(IdServeur).commands.create(datajouer); // crée la commande jouer
    client.guilds.cache.get(IdServeur).commands.create(datashifumi); // crée la commande Shifumi
    client.guilds.cache.get(IdServeur).commands.create(datastop); // crée la commande stop Shifumi

    console.log('prêt !');


});

//////////////////////////////////////////////////////////////////////////////// interactions

client.on("interactionCreate", async interaction => {

    if(!interaction.isChatInputCommand()){return}; //Filtre

    //////////////////////////////////////////////////////////////////////////////// Commande jouer

    if(interaction.commandName === "jouer"){ //commande jouer


        var NomAudio = interaction.options.getString('audio');
        
        
        if (sons.includes(NomAudio) === true  ) {
            var voc = interaction.member.voice.channel;
            

            if (voc){

                await interaction.reply({content: 'Ça roule !', ephemeral: true});

                const connection = joinVoiceChannel({
                    channelId: voc.id,
	                guildId: voc.guild.id,
	                adapterCreator: voc.guild.voiceAdapterCreator,
                });
                
                var ressource = createAudioResource('./audios/'+NomAudio+'.mp3');

                player.play(ressource);

                connection.subscribe(player);

                player.on(AudioPlayerStatus.Idle, () => { //destruction de la connexion
                    if(connection && connection.state.status != "destroyed"){
                        connection.destroy();
                    }
                });

            }else{await interaction.reply({content: 'Tu dois être dans un vocal.', ephemeral: true});};
        }else{await interaction.reply({content: 'Ce son n\'existe pas.', ephemeral: true});};


        
    }

    //////////////////////////////////////////////////////////////////////////////// commande shifumi

    if(interaction.commandName === "shifumi"){ //commande shifumi
        if(ShifumiEnCours === false){
            JS1.member = interaction.options.getMember('j1');
            JS2.member = interaction.options.getMember('j2');
            
            if(!JS1.member.user.bot && !JS2.member.user.bot && JS1.member!=JS2.member){

                ShifumiEnCours = true;

                

                JS1.Ajoue = false;
                JS2.Ajoue = false;

                // console.log(J1);
                // console.log(J2);

                var row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('Pierre')
                            .setLabel('Pierre')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('Feuille')
                            .setLabel('Feuille')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('Ciseaux')
                            .setLabel('Ciseaux')
                            .setStyle(ButtonStyle.Primary),
                    );

                var embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Shifumi entre ' + JS1.member.nickname +' et ' + JS2.member.nickname + ' !')
                    .setDescription('Choisissez votre coup !');

                await interaction.reply({ content: '', ephemeral: false, embeds: [embed], components: [row] });

            
            }
            else {await interaction.reply({content: 'N\'importe quoi !', ephemeral: true});};

        }else{
            var embedEnCours = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Un shifumi est déjà en cours !')
                .setDescription('Pour l\'arrêter, envoie /stop_shifumi au 8 12 12');

            await interaction.reply({ephemeral: true, embeds: [embedEnCours]});
        };
    };

    //////////////////////////////////////////////////////////////////////////////// commande stop_shifumi

    if(interaction.commandName === "stop_shifumi"){
        if(ShifumiEnCours){
            JS1.member = 'personne';
            JS1.Ajoue = false;
            JS2.member = 'personne';
            JS2.Ajoue = false;
            ShifumiEnCours = false;

            await interaction.reply({content:'Shifumi annulé.', ephemeral: false})
        }else{await interaction.reply({content: 'Pas de Shifumi en cours.', ephemeral: true})}
    };

});


client.on('interactionCreate', async interaction => {// bouton shifumi
	if (!interaction.isButton()) {return};

    if(ShifumiEnCours != true){
        await interaction.reply({content: 'Pas de Shifumi en cours', ephemeral: true});
        return;
    }

    if (interaction.member === JS1.member){
        if(JS1.Ajoue!=true){
            JS1.coup = interaction.component.label;
            JS1.Ajoue = true;
            await interaction.reply({content: JS1.coup + ', bien reçu !', ephemeral: true});
        }else{await interaction.reply({content: 'Spam pas !', ephemeral: true})};   
    };

    if (interaction.member === JS2.member){
        if(JS2.Ajoue!=true){
            JS2.coup = interaction.component.label;
            JS2.Ajoue = true;
            await interaction.reply({content: JS2.coup + ', bien reçu !', ephemeral: true});
        }else{await interaction.reply({content: 'Spam pas !', ephemeral: true})};   
    };

    if (interaction.member != JS2.member && interaction.member != JS1.member){
        await interaction.reply({content: 'Toi tg !', ephemeral: true});
    };

    if (JS1.Ajoue && JS2.Ajoue){
        let res = CalculShifumi(JS1,JS2);
        let Title = '';
        let Description = '';
        
        if(res === 'Egalité'){
            Title = 'Égalité !';
            Description = 'Vous avez tous les deux joué ' + JS1.coup + '.';
        }else{
            Title = res.member.nickname + ' vainqueur !';

            Description = JS1.member.nickname + ' a joué '+ JS1.coup + '.\n' + JS2.member.nickname + ' a joué '+ JS2.coup + '.';
        };


        JS1.member = 'personne';
        JS1.Ajoue = false;
        JS2.member = 'personne';
        JS2.Ajoue = false;
        ShifumiEnCours = false;

        var embedRes = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(Title)
                .setDescription(Description);

        await interaction.followUp({embeds: [embedRes]});
    }


});





client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

