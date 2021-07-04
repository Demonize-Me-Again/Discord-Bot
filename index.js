// Carregar o ./env no sistema.
const dotenv = require('dotenv');
dotenv.config({ path: './data/config/.env' });

// Base do bot (o client).
const Discord = require('discord.js');
const client = new Discord.Client();

// Collection pros comandos do bot.
client.commands = new Discord.Collection();

// Modulo nativo do nodejs pra leitura de arquivos.
const fs = require('fs');

// Listar o todos os comandos da pasta 'commands'. 
const commandFolders = fs.readdirSync('./commands');

// Pegar a listagem de pastas e passar por um for.
for (const folder of commandFolders) {
   // Pegar todos os arquivos que terminam com .js da pasta.
   const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
   // Pegar a listagem dos arquivos que termina com .js é passar por um for.
   for (const file of commandFiles) {
      // Obter o comando pelo arquivo .js
      const command = require(`./commands/${folder}/${file}`);
      // Inserir o comando no Collection.
      client.commands.set(command.name, command);
    }
}

// Informar que o bot estar online no terminal.
client.on('ready', () => {
	console.log(`[Bot] : ${client.user.tag} online.`);
});

const prefix = '!';

client.on('message', message => {
	// Verificar se a mensagem começa com o prefix ou se o author não é um bot.
  if (!message.content.startsWith(prefix) || message.author.bot) return;
	// Remover texto (slice), espaços (string) do content e passar o content em uma lista (split).
	const args = message.content.slice(prefix.length).trim().split(/ +/);
  // Pegar o primeiro valor da lista que é o comando e transformar ele em minusculo.
  const command = args.shift().toLowerCase();
	// Verificar se o comando é valido.
  if (!client.commands.has(command)) return;
	
	try {
       // Puxar o comando
		   const cmd = client.commands.get(command);
       // Executar o comando.
       cmd.execute(message, args)
	} catch (error) {
      // Retornar erro caso o comando não tenha sido executado com sucesso.
	   	message.reply(`[Error] : ${error}`);
	}
     
});

// Inserir o token do bot no client pra logar.
client.login(process.env.BOT_TOKEN);