    const {GuildMember, MessageEmbed} = require("discord.js");
    module.exports = {
        name: "guildMemberRemove",
        /**
         * @param {GuildMember} member
         */
        execute(member){
            console.log(`${member.toString()} left the the Server!`)
        }
    }