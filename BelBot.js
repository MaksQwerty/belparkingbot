// Подключение dotenv для скрытия токена
require('dotenv').config();
// Телеграф для создания бота
const {Telegraf, Markup} = require('telegraf');
// Подключение текстовых констант
const text = require('./const');

// Передать токен
const bot = new Telegraf(process.env.BOT_TOKEN, {polling: true});

// Старт бота
bot.start((ctx) => ctx.reply(`${ctx.message.from.first_name ? ctx.message.from.first_name : 'Пользователь парковочного пространства'}, добро пожаловать в чат-бот по вопросам платной 
парковки в городе Белгород. 

Вы можете вызвать главное меню, чтобы выбрать интересующий Вас раздел: /main_menu`));
// Вызов помощи
bot.help((ctx) => ctx.reply(text.help));

bot.command('parking_areas', (ctx) => ctx.replyWithHTML(text.parking_areas))

// Функция для обработки кнопок name - название кнопки, src - путь к изображению, text - текст для вывода
function addActionBot (name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
               await ctx.replyWithPhoto ({
                   source: src
               })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
        console.error(e)
        }
    })
}


// Создание кнопок в ГЛАВНОМ МЕНЮ
bot.command ('main_menu', async (ctx)=> {
    try {
        await ctx.replyWithHTML('<b>ГЛАВНОЕ МЕНЮ</b>', Markup.inlineKeyboard([
                [Markup.button.callback('Оплата парковки', 'btn_category1')],
                [Markup.button.callback('Границы зоны платной парковки', 'btn_category2')],
                [Markup.button.callback('Общая информация о зоне платной парковки', 'btn_category3')],
                [Markup.button.callback('Штраф за неоплату парковки', 'btn_category4')],
                [Markup.button.callback('Парковочные разрешения и абонементы', 'btn_category5')],
                [Markup.button.callback('Круглосуточный контактный центр', 'btn_category6')]
            ]))
        } catch (e) {
        console.error(e)
    }
})


    // Обработка кнопки из категории "Оплата парковок"
    bot.action ('btn_category1', async (ctx)=> {
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML('<b>Оплата парковки</b> \n\nВыберите интересующий вид парковки: \n\nВернуться в главное меню: /main_menu', Markup.inlineKeyboard([
                [Markup.button.callback('Придорожные парковки (УДС)', 'category1_btn1')],
                [Markup.button.callback('Плоскостные парковки (ППОТ, ППЗТ)', 'category1_btn2')]
            ]))
            } catch (e) {
            console.error(e)
        }
    })
                    // "Оплата парковок": Придорожные парковки (УДС)
                    bot.action ('category1_btn1', async (ctx)=> {
                        try {
                            await ctx.answerCbQuery()
                            await ctx.replyWithHTML(text.text[1][0], Markup.inlineKeyboard([
                                [Markup.button.callback('Паркомат', 'category1_btn1_1')],
                                [Markup.button.callback('СМС-сообщение', 'category1_btn1_2')],
                                [Markup.button.callback('Интернет-портал', 'category1_btn1_3')],
                                [Markup.button.callback('Мобильное приложение', 'category1_btn1_4')],
                                [Markup.button.callback('Сервис "Сбербанк Онлайн"', 'category1_btn1_5')],
                                [Markup.button.callback('Терминал/банкомат ПАО "Сбербанк"', 'category1_btn1_6')],
                                [Markup.button.callback('Назад', 'btn_category1')]
                            ]))
                            } catch (e) {
                            console.error(e)
                        }
                    })
                        // Активация кнопок "Придорожные парковки (УДС)"
                        addActionBot('category1_btn1_1', './img/1.png', text.text[1][2])
                        addActionBot('category1_btn1_2', './img/2.png', text.text[1][3])
                        addActionBot('category1_btn1_3', './img/3.png', text.text[1][4])
                        addActionBot('category1_btn1_4', './img/4.jpg', text.text[1][5])
                        addActionBot('category1_btn1_5', false, text.text[1][6])
                        addActionBot('category1_btn1_6', false, text.text[1][7])

                    // "Оплата парковок": Плоскостные парковки (ППОТ, ППЗТ)
                    bot.action ('category1_btn2', async (ctx)=> {
                        try {
                            await ctx.answerCbQuery()
                            await ctx.replyWithHTML(text.text[1][1], Markup.inlineKeyboard([
                                [Markup.button.callback('Парковочная касса', 'category1_btn2_1')],
                                [Markup.button.callback('СМС-сообщение', 'category1_btn2_2')],
                                [Markup.button.callback('Интернет-портал', 'category1_btn2_3')],
                                [Markup.button.callback('Мобильное приложение', 'category1_btn2_4')],
                                [Markup.button.callback('Назад', 'btn_category1')]
                            ]))
                            } catch (e) {
                            console.error(e)
                        }
                    })
                        // Активация кнопок "Плоскостные парковки (ППОТ, ППЗТ)"
                        addActionBot('category1_btn2_1', './img/6.jpg', text.text[1][8])
                        addActionBot('category1_btn2_2', './img/7.png', text.text[1][9])
                        addActionBot('category1_btn2_3', './img/8.png', text.text[1][10])
                        addActionBot('category1_btn2_4', './img/9.jpg', text.text[1][11])


    // Обработка кнопки из категории "Границы платной зоны"
    addActionBot('btn_category2', false, text.text[2][0])


    // Обработка кнопки из категории "Общая информация"
    bot.action ('btn_category3', async (ctx)=> {
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML(text.text[3][0], Markup.inlineKeyboard([
                [Markup.button.callback('Администрирование парковок', 'category3_btn1')]
            ]))
            } catch (e) {
            console.error(e)
        }
    })
    // Активация кнопки "Администрирование парковок"
    addActionBot('category3_btn1', false, text.text[3][1])


    // Обработка кнопки из категории "Штрафы"
    bot.action ('btn_category4', async (ctx)=> {
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML(text.text[4][0], Markup.inlineKeyboard([
                [Markup.button.callback('Как оплатить штраф?', 'category4_btn1')],
                [Markup.button.callback('Как обжаловать штраф?', 'category4_btn2')],
            ]))
            } catch (e) {
            console.error(e)
        }
    })
     // Активация кнопки "Штрафы"
    addActionBot('category4_btn1', false, text.text[4][1])
    addActionBot('category4_btn2', false, text.text[4][2])


    // Обработка кнопки из категории "Парковочные разрешения и абонементы"
    bot.action ('btn_category5', async (ctx)=> {
        try {
            await ctx.answerCbQuery()
            await ctx.replyWithHTML('<b>Парковочные разрешения и абонементы</b> \n\nВыберите интересующий вид парковки: \n\nВернуться в главное меню: /main_menu', Markup.inlineKeyboard([
                [Markup.button.callback('Придорожные парковки (УДС)', 'category5_btn1')],
                [Markup.button.callback('Плоскостные парковки (ППОТ, ППЗТ)', 'category5_btn2')]
            ]))
            } catch (e) {
            console.error(e)
        }
    })
     // Активация кнопок "Парковочные разрешения и абонементы"
    addActionBot('category5_btn1', false, text.text[5][0])
    addActionBot('category5_btn2', false, text.text[5][1])


    // Обработка кнопки из категории "Круглосуточный контактный центр"
    addActionBot('btn_category6', false, text.text[6][0])


// Улицы по зонам
bot.hears(/преображен/i, (ctx) => ctx.replyWithHTML(text.text[0][0]))
bot.hears(/граждан/i, (ctx) => ctx.replyWithHTML(text.text[0][1]))
bot.hears(/славы/i, (ctx) => ctx.replyWithHTML(text.text[0][2]))
bot.hears(/белгородский/i, (ctx) => ctx.replyWithHTML(text.text[0][3]))
bot.hears(/белгородского/i, (ctx) => ctx.replyWithHTML(text.text[0][4]))
bot.hears(/трубецкого/i, (ctx) => ctx.replyWithHTML(text.text[0][5]))
bot.hears(/нар/i, (ctx) => ctx.replyWithHTML(text.text[0][6]))
bot.hears(/попова/i, (ctx) => ctx.replyWithHTML(text.text[0][7]))
bot.hears(/свято/i, (ctx) => ctx.replyWithHTML(text.text[0][8]))
bot.hears(/театр/i, (ctx) => ctx.replyWithHTML(text.text[0][9]))
bot.hears(/победы/i, (ctx) => ctx.replyWithHTML(text.text[0][10]))
bot.hears(/пугач/i, (ctx) => ctx.replyWithHTML(text.text[0][11]))
bot.hears(/дегтяр/i, (ctx) => ctx.replyWithHTML(text.text[0][12]))
bot.on('text', (ctx) => ctx.replyWithHTML(text.text[0][13]))


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
console.log('Бот запущен');