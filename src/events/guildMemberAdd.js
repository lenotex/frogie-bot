const {GuildMember, MessageEmbed} = require("discord.js");
module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    execute(member){
        member.guild.channels.cache.get("961277210147291156").send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Welcome")
                    .setDescription(`${member.toString()} joined the Server!`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor("BLURPLE")
            ]
        })
        console.log(`${member.toString()} joined the Server!`)
    }
}