const TelegramBot = require('node-telegram-bot-api');

const token = 'Bot Father Token';
const bot = new TelegramBot(token, { polling: true });

const registeredUsers = {};

bot.onText(/\/register/, (msg) => {
    const address = msg.text
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    if (registeredUsers[userId]) {
        registeredUsers[userId].canSendMessage = true;
        bot.sendMessage(chatId, 'Start successful. You can send messages now.');
    } else {
        registeredUsers[userId] = {
            canSendMessage: false
        };
        bot.sendMessage(chatId, 'Register successful. You can send messages now.');
    }
});

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    const userId = msg.from.id;

    console.log(chatId)
    console.log(userId)

    if (!registeredUsers[userId]) {
        registeredUsers[userId] = {
            canSendMessage: false
        };
        bot.sendMessage(chatId, 'Please register first. /register');
    }

});


