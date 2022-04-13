const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js");
const fs = require("fs")
const reactionRolesConfig = JSON.parse(fs.readFileSync('src/commands/reactionRoles.json', 'utf8'))

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reaction-role")
        .setDescription("Create or delete reaction role")
        .addSubcommand(subCommand => subCommand.setName("create").setDescription("Create a reaction role message")
            .addStringOption(option => option.setName("message-id").setDescription("The Message Id").setRequired(true))
            .addRoleOption(option => option.setName("role").setDescription("The Reaction Role").setRequired(true))
            .addStringOption(option => option.setName("emoji").setDescription("The Reaction Role Emoji").setRequired(true)))
        .addSubcommand(subCommand => subCommand.setName("delete").setDescription("Delete a reaction role message")
            .addStringOption(option => option.setName("reaction-role-id").setDescription("The Reaction Role Id").setRequired(true))),
    async execute(client){
        switch (client.options.getSubcommand()){
            case "create":{

                //Get the message id and check if it is valid
                const messageId = client.options.getString("message-id")
                try {
                    await client.channel.messages.fetch(messageId)
                }catch (e) {
                    client.reply({
                        embeds: [
                            new MessageEmbed()
                                .setTitle("Error")
                                .setDescription("Please enter a valid Message Id")
                                .setColor("RED")
                        ]
                    })
                    return
                }

                const role = client.options.getRole("role")

                //Get the emoji and check if it is valid
                const emoji = client.options.getString("emoji")


                try{
                    client.channel.messages.fetch(messageId)
                        .then(message => {
                            const toSave = {messageId: messageId, role: role.id, emoji: emoji, reactionRoleId: reactionRolesConfig.reactions.length + 1}
                            reactionRolesConfig.reactions.push(toSave)
                            fs.writeFileSync('src/commands/reactionRoles.json', JSON.stringify(reactionRolesConfig))
                            client.channel.messages.cache.get(messageId).react(emoji)
                            client.reply({
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle("Reaction Role created")
                                        .setDescription("Your reaction Role was successfully added")
                                        .addFields(
                                            {name: "Message Id", value: messageId, inline: true},
                                            {name: "Role", value: role, inline: true},
                                            {name: "Emoji", value: emoji, inline: true},
                                            {name: "Reaction Role Id", value: reactionRolesConfig.reactions.length + 1}
                                        )
                                        .setColor("GREEN")
                                ]
                            })
                        })
                        .catch(console.error)
                }catch (e) {
                    console.log(e)
                }
            }
            case "delete":{

                const reactionRoleId = client.options.getString("reaction-role-id")
                for (let i = 0; i < reactionRolesConfig.reactions.length; i++) {
                    if(reactionRolesConfig.reactions[i].reactionRoleId === reactionRoleId){
                        reactionRolesConfig.reactions[i].delete()
                        fs.writeFileSync('src/commands/reactionRoles.json', JSON.stringify(reactionRolesConfig))
                    }
                }
            }
        }
    }
}


