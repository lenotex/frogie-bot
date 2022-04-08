const { SlashCommandBuilder } = require("@discordjs/builders")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("reactionrole")
        .setDescription("Create, edit or delete reaction role")
        .addSubcommand(subCommand => subCommand.setName("create").setDescription("Create a reaction role message")
            .addStringOption(option => option.setName("text").setDescription("Text"))
            .addRoleOption(option => option.setName("role").setDescription("Role"))
            .addStringOption(option => option.setName("emoji").setDescription("Emoji")))
        .addSubcommand(subCommand => subCommand.setName("edit").setDescription("Edit a reaction role message"))
        .addSubcommand(subCommand => subCommand.setName("delete").setDescription("Delete a reaction role message")
            .addStringOption(option => option.setName("message").setDescription("The message ID"))),
    async execute(interaction){
        switch (interaction.options.getSubcommand()){
            case "create":{
                interaction.channel.send("test")
            }
        }
    }
}


