const {MessageReaction, User} = require("discord.js");
const fs = require("fs")
const reactionRolesConfig = JSON.parse(fs.readFileSync('src/commands/reactionRoles.json', 'utf8'))

module.exports = {
    name: "messageReactionAdd",
    /**
     * @param {MessageReaction} reaction
     * @param {User} user
     */
    execute(reaction, user) {
        console.log("Reaction")

        if (reaction.message.partial) reaction.fetch()
        if (reaction.partial) reaction.fetch()
        if (user.bot || !reaction.message.guild) return

        for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
            let reactionRole = reactionRolesConfig.reactions[index]
            console.log(reaction.message.id)
            console.log(reactionRole.messageId)
            console.log(reaction.emoji.name)
            console.log(reactionRole.emoji)
            if (reaction.message.id === reactionRole.messageId && reaction.emoji === reactionRole.emoji && !reaction.message.guild.members.cache.get(user.id).roles.cache.has(reactionRole.role)) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction)
            }
        }
    }
}