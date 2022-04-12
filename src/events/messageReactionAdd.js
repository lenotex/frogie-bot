const {Client} = require("discord.js");
const fs = require("fs")
const reactionRolesConfig = JSON.parse(fs.readFileSync('src/commands/reactionRoles.json', 'utf8'))

module.exports = {
    name: "raw",
    /**
     *
     */
    execute(packet) {
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;

        if (packet.t === 'MESSAGE_REACTION_ADD') {
            console.log("ADDED");
            for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
                let reactionRole = reactionRolesConfig.reactions[index]
                if (packet.d.message_id === reactionRole.messageId && packet.d.emoji.name === reactionRole.emoji && !packet.d.message.guild.members.cache.get(packet.d.user.id).roles.cache.has(reactionRole.role)) {
                    packet.d.message.guild.members.cache.get(packet.d.user.id).roles.add(reactionRole.role)
                }
            }
        }

        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            console.log("REMOVED");
            for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
                let reactionRole = reactionRolesConfig.reactions[index]
                if (packet.d.message_id === reactionRole.messageId && packet.d.emoji.name === reactionRole.emoji && packet.t.message.guild.members.cache.get(packet.d.user.id).roles.cache.has(reactionRole.role)) {
                    packet.d.message.guild.members.cache.get(packet.d.user.id).roles.remove(reactionRole.role)
                }
            }
        }
    }
}