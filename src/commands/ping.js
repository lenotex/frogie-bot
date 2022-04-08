const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Pings the bot"),
    async execute(interaction){
        interaction.reply("Pong!")
    }
}