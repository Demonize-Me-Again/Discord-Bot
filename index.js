// Carregar o ./env no sistema.
const dotenv = require('dotenv');
dotenv.config({ path: './data/config/.env' });

// Base do bot (o client).
const Discord = require('discord.js');
const client = new Discord.Client();

// Informar que o bot estar online no terminal.
client.on('ready', () => {
	console.log(`[Bot] ${client.user.tag} online.`);
});


// Inserir o token do bot no client pra logar.
client.login(process.env.BOT_TOKEN);