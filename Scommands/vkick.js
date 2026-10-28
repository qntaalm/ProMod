const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {

 data : new SlashCommandBuilder()
	.setName('vkick')
	.setDescription('طرد البوتات الغير موثقة')
}