const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {

 data : new SlashCommandBuilder()
	.setName('roles')
	.setDescription('مسح جميع الرولات')
}