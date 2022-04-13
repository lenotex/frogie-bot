const fs = require("fs")
const {MessageReaction, User} = require("discord.js");

module.exports = {
    name: "messageReactionRemove",
    /**
     *  @param {MessageReaction} reaction
     *  @param {User} user
     */

    execute(reaction, user) {
        const reactionRolesConfig = JSON.parse(fs.readFileSync('src/commands/reactionRoles.json', 'utf8'))

        if(reaction.message.partial) reaction.fetch()
        if (reaction.partial) reaction.fetch()
        if(user.bot || !reaction.message.guild) return

        for (let i = 0; i < reactionRolesConfig.reactions.length; i++) {
            let reactionRole = reactionRolesConfig.reactions[i]
            if (reaction.message.id === reactionRole.messageId && (reactionRole.emoji).includes(reaction.emoji.name.toString()) && reaction.message.guild.members.cache.get(user.id).roles.cache.has(reactionRole.role)) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reactionRole.role)
            }
        }
    }
}