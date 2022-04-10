const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Shows information about the server and members")
        .addSubcommand(subCommand => subCommand.setName("server").setDescription("Shows information about the server"))
        .addSubcommand(subcommand => subcommand.setName("member").setDescription("Shows information about a member")
            .addUserOption(option => option.setName("member").setDescription("Member").setRequired(true))),
    async execute(client){
        switch (client.options.getSubcommand()){
            case "server":{
                client.reply({embeds: [
                    new MessageEmbed()
                        .setTitle(`Information for the Server ${client.guild.name}`)
                        .addFields([
                            {
                                name: "Channels",
                                value: `${client.guild.channels.cache.size} Channels`
                            },
                            {
                                name: "Created",
                                value: `<t:${Math.round(client.guild.createdTimestamp/1000)}>`,
                                inline: true
                            }
                        ])
                    ]})
                break
            }
            case "member":{
                const member = client.options.getMember("member")
                client.reply({embeds: [
                        new MessageEmbed()
                            .setTitle(`Information for ${member.user.tag}`)
                            .setThumbnail(member.user.avatarURL({dynamic: true}))
                            .addFields([
                                {
                                    name: "Account created",
                                    value: `<t:${Math.round(member.user.createdTimestamp/1000)}>`
                                },
                                {
                                    name: "Server joined",
                                    value: `<t:${Math.round(member.joinedTimestamp/1000)}>`,
                                    inline: true
                                }
                            ])
                    ]})
                break
            }
        }
    }
}