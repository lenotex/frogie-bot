const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("help").setDescription("Help Command"),
    async execute(interaction){
        interaction.reply("Shows help")
    }
}