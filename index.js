process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const debug = require('./helpers');
const token = '1178156722:AAEyAyM7E8m9peeIITtIgZV7y9eqPtsV8OY';

console.log('Bot has been started....')


const bot = new TelegramBot(token, {
    polling: {
        interval: 100,
        autoStart: true,
        params: {
            timeout: 100
        }
    }
});

const inline_keyboard = [
    [
        {
            text: 'Forward',
            callback_data: 'forward'
        },
        {
            text: 'Reply',
            callback_data: 'reply'
        }
    ],
    [
        {
            text: 'Edit',
            callback_data: 'edit'
        },
        {
            text: 'Delete',
            callback_data: 'delete'
        }
    ]
]

bot.on ('callback_query',  query => {

    const {chat, message_id, text}  = query.message

    switch (query.data) {
        case 'forward':
            // куда, откуда, что
            bot.forwardMessage(chat.id, chat.id, message_id)
            break;
    }

    bot.answerCallbackQuery({
        callback_query_id: query.id
    })
})

bot.onText(/\/start/, (msg) =>{
    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'Keyboard12345', {
        reply_markup: {
            inline_keyboard
        }
    })
})