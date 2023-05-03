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
        console.log(msg)
        if (msg.includes('┃ Friends ┃ Rorzin')) commands(msg)
        else if (msg.includes('Balance: ')) bot.chat('/msg Rorzin ' + msg)
        else if (msg.includes('Please, login with the command:')) bot.chat('/login bruh51')
        else if (msg.includes('Please type: /captcha ')) {
            var msgarr = msg.split('Please type: /captcha ')
            var captcha = msgarr[1].split(' ').join('')
            bot.chat('/captcha ' + captcha)
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
        setTimeout(() => bot.clearControlStates(), 2000)
    }

    bot.once('spawn', () => {
        console.log(bot.username + ' is on!!')
        setTimeout(() => {
            bot.chat('/register bruh51 bruh51')
            setTimeout(() => {
                bot.setControlState('forward', true)
            }, 1000)
        }, 2000)
        setTimeout(() => {
            bot.clearControlStates()
            const compass = bot.inventory.items().find(item => item.name.includes('compass'))
            if (compass) bot.equip(compass, 'hand')
            bot.activateItem()
        }, 8000)
        setTimeout(() => {
            moveBack()
            bot.chat('/friend add Rorzin')
            bot.chat('/friend add pikax21')
        }, 10000)
        setInterval(() => bot.chat('/aa'), 60000)
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

createBot('paice8')
setTimeout(() => createBot('Bousiud'), 5000)
setTimeout(() => createBot('Ofaufaec'), 10000)
setTimeout(() => createBot('raidimi'), 15000)
setTimeout(() => createBot('Doumu'), 20000)
