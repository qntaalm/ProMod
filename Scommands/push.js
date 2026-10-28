const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("push")
        .setDescription("إزالة جميع الرتب من جميع الأعضاء"),
};