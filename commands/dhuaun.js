const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, generateDependencyReport } = require('@discordjs/voice');
const { createReadStream } = require('fs');
const { join } = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dhuaun')
		.setDescription('でゅあうん'),
	execute: async function(interaction) {
		const member = interaction.member;
		const voiceChannel = member.voice.channel;

	if (!voiceChannel) {
		await interaction.reply("ぽまえvcに居らんから無理やで");
		return;
	}


    const connection = joinVoiceChannel({
		channelId: voiceChannel.id,
		guildId: voiceChannel.guild.id,
		adapterCreator: voiceChannel.guild.voiceAdapterCreator,
	  });

	// 音声ファイルのパスを指定
    const audioFilePath = join(__dirname, '../dhuaun.wav');

    // 音声ファイルを読み込み、ストリームとして再生
	const player = createAudioPlayer();
    const audioResource = createAudioResource(createReadStream(audioFilePath));
   	player.play(audioResource);
    connection.subscribe(player);
	await interaction.reply(`ﾃﾞｭｱｳﾝ`);


    // 音声再生が終了したらボイスチャットから退出
    player.on('idle', () => {
      connection.destroy();
    });

	},
}