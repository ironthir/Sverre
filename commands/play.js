const Discord = require('discord.js')
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const { OpusEncoder } = require('@discordjs/opus');
const  {
    Util
} = require("discord.js");

module.exports = {
	name: 'play',
	description: 'Playing audio from Youtube videos',
	execute(receivedMessage, arguments) {
    const Member = receivedMessage.member; // Getting the member.
    if(Member.voice.channel){
        Member.voice.channel.join().then(VoiceConnection => {
            gettheytdl(arguments)
            async function gettheytdl(arguments){
                let getinfo = await ytdl.getBasicInfo(arguments);
                let title = Util.escapeMarkdown(getinfo.videoDetails.title);
                receivedMessage.channel.send(':musical_note:' + " **Now Playing:** " + title);
        }
        VoiceConnection.play(ytdl(arguments), {volume: 0.5}).on("finish", () => VoiceConnection.disconnect());
    })
    }
    else{
        receivedMessage.channel.send("You need to join a voice channel first");
    } 
  }
}