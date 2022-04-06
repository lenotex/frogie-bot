const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Shows Information about the Server")
        .addSubcommand(subCommand => subCommand.setName("server").setDescription("Show Information about the Server"))
        .addSubcommand(subcommand => subcommand.setName("member").setDescription("Show Information about a Member")
            .addUserOption(option => option.setName("member").setDescription("Member").setRequired(true))),
    async execute(interaction){
        switch (interaction.options.getSubcommand()){
            case "server":{
                interaction.reply({embeds: [
                    new MessageEmbed()
                        .setTitle(`Information for the Server ${interaction.guild.name}`)
                        .addFields([
                            {
                                name: "Channels",
                                value: `${interaction.guild.channels.cache.size} Channels`
                            },
                            {
                                name: "Created",
                                value: `<t:${Math.round(interaction.guild.createdTimestamp/1000)}>`,
                                inline: true
                            }
                        ])
                    ]})
                break
            }
            case "member":{
                const member = interaction.options.getMember("member")
                interaction.reply({embeds: [
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