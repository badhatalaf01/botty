const mineflayer = require('mineflayer')

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const createBot = (username) => {
    const bot = mineflayer.createBot({
        username: username,
        host: 'top.hylexmc.net',
        version: '1.18.2'
    })

    bot.on('messagestr', (msg) => {
        console.log(bot.username + ': ' + msg)
        if (msg.includes('┃ Friends ┃ Rorzin')) commands(msg)
        else if (msg.includes('Balance: ')) bot.chat('/msg Rorzin ' + msg)
        else if (msg.includes('Please, login with the command:')) bot.chat('/login bruh51')
        else if (msg.includes('/register (password) (ConfirmPassword)')) bot.chat('/register bruh51 bruh51')
        else if (msg.includes('Please type: /captcha ')) {
            var captchaArr = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９']

            var captchaObj = {
                '０': '0',
                '１': '1',
                '２': '2',
                '３': '3',
                '４': '4',
                '５': '5',
                '６': '6',
                '７': '7',
                '８': '8',
                '９': '9'
            }

            var msgarr = msg.split('Please type: /captcha ')
            var input = msgarr[1].split(' ').join('')
            var output = []
            for (let i in input) {
                if (captchaArr.includes(input[i])) output.push(captchaObj[input[i]])
                else output.push(input[i])
            }
            console.log(output.join(''))
            bot.chat('/captcha ' + output.join(''))
        }
    })

    const commands = (msg) => {
        if (msg.includes('chat ')) {
            var msgarr = msg.split('chat ')
            var mainmsg = msgarr[1]
            bot.chat(mainmsg)
            console.log(mainmsg)
        }
        else if (msg.includes('check bal')) bot.chat('/bal')
    }

    const moveBack = () => {
        bot.setControlState('back', true)
        setTimeout(() => bot.clearControlStates(), 2100)
    }

    var hasMoved = false

    const checkServer = () => {
        setInterval(() => {
            if (bot.game.serverBrand === 'Waterfall <- Spigot') {
                bot.setControlState('forward', true)
                setTimeout(() => bot.clearControlStates(), 1000)
                const compass = bot.inventory.items().find(item => item.name.includes('compass'))
                if (compass) bot.equip(compass, 'hand')
                bot.activateItem()
            }
            else if (bot.game.serverBrand === 'Waterfall <- Pufferfish') {
                if(!hasMoved) {
                    setTimeout(moveBack, 1000)
                    hasMoved = !hasMoved
                }
            }
        }, 10000)
    }

    bot.once('spawn', () => {
        console.log(bot.username + ' is on!!')
        setTimeout(() => {
            moveBack()
            bot.chat('/friend add Rorzin')
            bot.chat('/friend add pikax21')
        }, 30000)
        setInterval(() => bot.chat('/aa'), 60000)
        checkServer()
    })

    bot.on('windowOpen', (window) => {
        console.log(window.title)
        if (window.title.includes('Where would you like to go?')) bot.simpleClick.leftMouse(22)
    })

    bot.on('kicked', (rsn) => {
        console.log('kicked bcoz: ' + rsn)
        createBot(username)
    })
    bot.on('error', (rsn) => {
        console.log('error bcoz: ' + rsn)
        createBot(username)
    })
}

createBot(makeid(10))
setTimeout(() => createBot(makeid(10)), 5000)
setTimeout(() => createBot(makeid(10)), 10000)
setTimeout(() => createBot(makeid(10)), 15000)
setTimeout(() => createBot(makeid(10)), 20000)
