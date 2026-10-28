const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {

 data : new SlashCommandBuilder()
	.setName('akick')
	.setDescription('طرد كل البوتات')
}