

module.exports = async (bot, message) => {
	if (message.author.bot) return;

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if (message.author.bot || message.channel.type === 'dm') return;
	const prefix = "?";

	if (message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) return message.channel.send(`${message.guild.name}'s Prefix is \`${prefix}\`\n\nTo get a list of commands, say \`${prefix}help\``);

	if (!message.content.startsWith(prefix)) return;
	const commandfile = bot.commands.get(cmd.slice(prefix.length).toString().toLowerCase()) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length).toString().toLowerCase()));;
	if (commandfile) {
		commandfile.run(bot, message, args);
	}

}
