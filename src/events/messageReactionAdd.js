const {GuildMember, MessageEmbed} = require("discord.js");
const fs = require("fs")
const reactionRolesConfig = JSON.parse(fs.readFileSync('src/commands/reactionRoles.json', 'utf8'))

module.exports = {
    name: "messageReactionAdd",
    /**
     * @param
     */
    execute(reaction, user) {
        if (reaction.message.partial) reaction.fetch()
        if (reaction.partial) reaction.fetch()
        if (user.bot || !reaction.message.guild) return

        for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
            let reactionRole = reactionRolesConfig.reactions[index]
            if (reaction.message.id === reactionRole.message && reaction.emoji.name === reactionRole.emoji && !reaction.message.guild.members.cache.get(user.id).roles.cache.has(reactionRole.role.id)) {
                reaction.message.guild.members.cache.get(user.id).roles.add(role.id)
            }
        }
    }
}