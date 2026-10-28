const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {

 data : new SlashCommandBuilder()
	.setName('all')
	.setDescription('طرد كل البوتات و مسح جميع الرولات')
}