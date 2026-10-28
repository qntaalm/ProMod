const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {

 data : new SlashCommandBuilder()
	.setName('remove')
	.setDescription('ازالة الشخص من صلاحية التحكم فالبوت')
  .addUserOption(option => 
                option.setName("user").setDescription("put user").setRequired(true)
                )
}