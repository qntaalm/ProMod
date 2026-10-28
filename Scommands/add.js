const { SlashCommandBuilder } = require('@discordjs/builders')


module.exports = {

 data : new SlashCommandBuilder()
	.setName('add')
	.setDescription('اضافة شخص للتحكم فالبوت')
  .addUserOption(option => 
                option.setName("user").setDescription("put user").setRequired(true)
                )
}