const Discord = require('discord.js')
const Cfg = require('./Install/Cfg.js')
const Client = new Discord.Client()
const Prefix = '-'
const Fs = require('fs')
let TOKENDISCORD = Cfg.key.TOKENDISCORD

Client.commands = new Discord.Collection()

const CommandFiles = Fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of CommandFiles){
    const Command = require(`./commands/${file}`)
    Client.commands.set(Command.name, Command)
}
 
Client.once('ready',() => {
    console.log('Bot online')
})

Client.on('message', message =>{
    if(!message.content.startsWith(Prefix) || message.author.bot) 
        return

    const Args = message.content.slice(Prefix.length).split(/ +/)
    const Command = Args.shift().toLowerCase()

    switch (Command) { 
        case 'statslolat4z':
            Client.commands.get('Stats').execute(message, Args,'Lolat4z')
            break
        case 'statsjatomas':
            Client.commands.get('Stats').execute(message, Args,'Jatomas')
            break
    }
}) 

Client.login(TOKENDISCORD) 