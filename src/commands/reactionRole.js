const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require("fs")
const reactionRolesConfig = JSON.parse(fs.readFileSync('src/commands/reactionRoles.json', 'utf8'))



module.exports = {
    data: new SlashCommandBuilder()
        .setName("reaction-role")
        .setDescription("Create or delete reaction role")
        .addSubcommand(subCommand => subCommand.setName("create").setDescription("Create a reaction role message")
            .addStringOption(option => option.setName("message-link").setDescription("The Message Link").setRequired(true))
            .addRoleOption(option => option.setName("role").setDescription("The Reaction Role").setRequired(true))
            .addStringOption(option => option.setName("emoji").setDescription("The Reaction Role Emoji").setRequired(true)))
        .addSubcommand(subCommand => subCommand.setName("delete").setDescription("Delete a reaction role message")
            .addStringOption(option => option.setName("message-link").setDescription("The message ID").setRequired(true))
            .addStringOption(option => option.setName("emoji").setDescription("The Reaction Role Emoji").setRequired(true))),
    async execute(client){
        switch (client.options.getSubcommand()){
            case "create":{
                const messageLink = client.options.getString("message-link")
                const role = client.options.getRole("role")
                try{
                    const messageID = messageLink.substr(messageLink.lastIndexOf("/") + 1, messageLink.length);
                    const emoji = client.options.getString("emoji")

                    client.channel.messages.fetch(messageID)
                        .then(message => {
                            const toSave = {messageId: message.id, role: role.id, emoji: emoji}
                            reactionRolesConfig.reactions.push(toSave)
                            fs.writeFileSync('src/commands/reactionRoles.json', JSON.stringify(reactionRolesConfig))
                            message.react(emoji)
                        })
                        .catch(console.error)
                }catch (e) {
                    console.log(e)
                }
            }
            case "delete":{
                const messageLink = client.options.getString("message-link")
            }
        }
    }
}


