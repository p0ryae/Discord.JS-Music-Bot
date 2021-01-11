const ModeratorRoleModel = require('../models/ModeratorRoleModel');

function getMember(message, args) {
    if (!message) throw new Error('A message wasn\'t provided!');
    if (!args) throw new Error('No arguments were provided!');

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]) || message.member;

    return member;
}

async function checkPerms(message, perm = '') {
    if (!message) throw new Error("Please Provide A Message Mr. Cruft");
    if (!perm) throw new Error("Please Provide A Perm Mr. Cruft");

    let data = await ModeratorRoleModel.findOne({ GuildID: message.guild.id });

    if (!data) {
        if (!message.member.hasPermission(perm)) {
            return true;
        }
    } else if (data) {
        if (!message.member.hasPermission(perm) || !message.member.roles.cache.has(data.RoleID)) {
            return true;
        }
    } else {
        return false;
    }
}

module.exports = {
    getMember,
    checkPerms
}