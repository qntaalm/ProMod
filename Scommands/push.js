const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("push")
        .setDescription("إزالة جميع الرتب من جميع الأعضاء"),
};
