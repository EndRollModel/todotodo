const LoggerModule = {};
const dayjs = require("dayjs");
const config = require('../config/winConfig');

function getFromPath() {
    const stack = new Error().stack;
    const callerLine = stack.split("\n")[3];
    return callerLine.match(/at (.*?) \(/)[1];
}

LoggerModule.showLog = function (message) {
    const fromPath = getFromPath();
    message = message.toString().indexOf('[object Object]') > -1 ? JSON.stringify(message) : message;
    if (config.appConfig.showLog === true) {
        console.log(`----- ----- ----- -----\n時間：${dayjs().format('YYYY/MM/DD-HH:mm:ss')}\n來源：${fromPath}\n內容：${message}\n----- ----- ----- -----`)
    }
}

LoggerModule.showELog = function (message) {
    const fromPath = getFromPath()
    message = message.toString().indexOf('[object Object]') > -1 ? JSON.stringify(message) : message;
    if (config.appConfig.showLog === true) {
        console.log(`----- ----- ----- -----\n${logColors.red}時間：${dayjs().format('YYYY/MM/DD-HH:mm:ss')}\n來源：${fromPath}\n內容：${message}${logColors.white}\n----- ----- ----- -----`)
    }
}

const logColors = {
    // https://stackoverflow.com/questions/7505623/colors-in-javascript-console
    reset: '\x1b[0m',
    //text color
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    //background color
    blackBg: '\x1b[40m',
    redBg: '\x1b[41m',
    greenBg: '\x1b[42m',
    yellowBg: '\x1b[43m',
    blueBg: '\x1b[44m',
    magentaBg: '\x1b[45m',
    cyanBg: '\x1b[46m',
    whiteBg: '\x1b[47m'
}

module.exports = LoggerModule;
