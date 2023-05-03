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
    })

    const commands = (msg) => {
        if (msg.includes('chat ')) {
            var msgarr = msg.split('chat ')
            var mainmsg = msgarr[1]
            bot.chat(mainmsg)
            console.log(mainmsg)
        }
        else if (msg.includes('check bal')) bot.chat('/bal')
        else if (msg.includes('Please, login with the command:')) bot.chat('/login bruh51')
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

createBot(makeid(10))
setTimeout(() => createBot(makeid(10)), 5000)
setTimeout(() => createBot(makeid(10)), 10000)
setTimeout(() => createBot(makeid(10)), 15000)
setTimeout(() => createBot(makeid(10)), 20000)
