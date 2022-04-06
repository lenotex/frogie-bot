require("dotenv").config()
const fs = require("fs")
const { Client, Collection, Intents } = require("discord.js")

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]})
client.commands = new Collection()

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))


commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

eventFiles.forEach(eventFile => {
    const event = require(`./events/${eventFile}`)
    client.on(event.name, (...args) => event.execute(...args))
})

client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({name: "in Jet's pond", type: "PLAYING"})
})

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if(command){
        try {
            await command.execute(interaction)
        }catch(e) {
            console.error(e)

            if(interaction.deferred || interaction.replied){
                interaction.editReply("Error")
            }else{
                interaction.reply("Error")
            }
        }
    }
})


client.login(process.env.DISCORD_BOT_TOKEN)