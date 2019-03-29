const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
var now = new Date();
var lethal = false;
var peaceful = false;

var prefix = config.prefix;

// - Start -
bot.login(config.token);

// - Set the bot's online status -
bot.on("ready", () => {
	console.log('BOT ON');
	
    bot.user.setStatus("online"); // set status
	console.log('BOT STATUS SET.');
	
	bot.user.setGame("you need help"); // set game
	console.log('BOT CHANGED GAME.');
});

/*bot.on("guildCreate", guild => { // log when joining a guild
	console.log('BOT ADDED TO SERVER: ' + guild.name + " | SERVER OWNER: " + guild.owner.user.username + '.');
});*/

// - Text Commands -
bot.on("message", async message => {
	// bot becomes you
	const command = message.content.toLowerCase();
	
	if(message.author.bot && lethal === false) return; // won't respond to another bot
	
	console.log('[SERVER: ' + message.guild.name + ' | CHANNEL: ' + message.channel.name + '] User ' + message.author.username + ' used command ' + command + '.');
	
	if(command.startsWith(config.prefix + 'help')) { // help command
		message.channel.send({embed: {
				color: 0xa39a9c,
				 author: {
					name: message.author.username + ',',
					icon_url: message.author.avatarURL
				},
				title: "My commands are:",
				description: "**" + config.prefix + "lethalmode** - toggles lethal mode. makes me reply to other bots, and myself..\n"
						   + "**" + config.prefix + "niceguy** - toggles peaceful mode. puts me in a good mood, I will only reply to people saying \"no u\".\n"
						   + "**" + config.prefix + "say [type your string here]** - makes me repeat what you say.",
				footer: {
					text: "© noyou_bot - made by gemesil"
				}
		}});		
	}
	
	if(command === config.prefix + "lethalmode") {
		if (lethal === false) // if lethal OFF
		{
			lethal = true; // turn it ON
			message.channel.send({embed: {
				color: 0xe65555,
				
				 author: {
					name: message.author.username + ',',
					icon_url: message.author.avatarURL
				},
				title: "Lethal mode has been turned **ON**",
				footer: {
					icon_url: "https://i.imgur.com/BCvtMoF.png",
					text: "LETHAL - NOT SAFE FOR CHILD USE"
				}
			}});
		}
		else
		{
			if (lethal === true) // if lethal ON
			{
				lethal = false; // turn it OFF
				message.channel.send({embed: {
					color: 0xa39a9c,
					 author: {
						name: message.author.username + ',',
						icon_url: message.author.avatarURL
					},
					title: "Lethal mode has been turned **OFF**",
					footer: {
						icon_url: "https://i.imgur.com/3l0Z0aW.png",
						text: "NON LETHAL - THAT\'S A LOT OF DAMAGE"
					}
				}});
			}
		}
	}
	
	if(command === config.prefix + "niceguy") {
		if (peaceful === false) // if peace OFF
		{
			peaceful = true; // turn it ON
			message.channel.send({embed: {
				color: 0x38a41e,
				
				 author: {
					name: message.author.username + ',',
					icon_url: message.author.avatarURL
				},
				title: "Peaceful mode has been turned **ON**",
				footer: {
					icon_url: "https://i.imgur.com/SIgthQN.jpg",
					text: "I\'m just a nice guy"
				}
			}});
		}
		else
		{
			if (peaceful === true) // if peace ON
			{
				peaceful = false; // turn it OFF
				message.channel.send({embed: {
					color: 0xa39a9c,
					
					 author: {
						name: message.author.username + ',',
						icon_url: message.author.avatarURL
					},
					title: "Peaceful mode has been turned **OFF**",
					footer: {
						icon_url: "https://i.imgur.com/HNlpzvJ.jpg",
						text: "As you wish.."
					}
				}});
			}
		}
	}
	
	if(!message.content.startsWith(config.prefix) != 0)
	{
		if(peaceful === false) message.reply('no u!').catch(O_o=>{}); // peaceful off, reply to everything
		if(peaceful === true && message.content.startsWith('no u')) message.reply('no u!').catch(O_o=>{}); // peaceful on, reply only to message that start with no u
	}
	
	if(command.startsWith(config.prefix + 'say')) { // say command
		var sayMessage = message.content;
		sayMessage = sayMessage.replace(config.prefix + 'say', '');
		message.delete().catch(O_o=>{}); 
		message.channel.send(sayMessage);
	}
});
