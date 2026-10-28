const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {

 data : new SlashCommandBuilder()
	.setName('rooms')
	.setDescription('حذف جميع الرومات')
}