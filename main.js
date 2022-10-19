const moment = require('moment-timezone');
const filedl = require("nodejs-file-downloader");
const figlet = require('figlet');
const fastFolderSizeSync = require('fast-folder-size/sync');
const converter = require('byte-converter').converterBase2;
const md = require('markdown-it-faxes')({
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: false // Autoconvert URL-like text to links
}).use(require('markdown-it-highlightjs'), { code: true });
let defaultFonts = ["Graffiti", "Standard", "Stop", "Slant", "Pagga", "Larry 3D"];

async function figlify(text, options) {
    if(typeof options.font == 'undefined') {
        if(typeof options.randFont == 'undefined' || options.randFont == false) {
            figlet.text(text, { font: 'Standard', width: options.width || 700 }, function(err, data) {
                if(err) throw err;
                let str = `${data}\n-------------------------------------------`
                console.log(chalk.bold(chalk.blueBright(str)));
            });
        } else {
            let chosen = await getRandomArray(defaultFonts);
            figlet.text(text, { font: chosen, width: options.width || 700 }, function(err, data) {
                if(err) throw err;
                let str = `${data}\n-------------------------------------------`
                console.log(chalk.bold(chalk.blueBright(str)));
            });
        }
    } else {
        figlet.text(text, { font: options.font, width: options.width || 700 }, function(err, data) {
            if(err) throw err;
            let str = `${data}\n-------------------------------------------`
            console.log(chalk.bold(chalk.blueBright(str)));
        });
    }
};

async function mdConvert(content) {
    let rendered = await md.render(content);
    return rendered;
};

async function generateRandom(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

async function sanitize(value, bypassScripting) {
    if(!bypassScripting || typeof bypassScripting == 'undefined') {
        if(value.toLowerCase().includes('</')) {
            value = await value.replaceAll('<', 'NULLED:lessThan').replaceAll('>', 'NULLED:greaterThan');
        };
    };
    value = await value.replaceAll('"', '\'').replaceAll('`', '\`').replaceAll("'", "\'");
    return value;
};

async function saveFile(url, name, type, dir, clonefiles) {
    try {
        const downloader = new filedl({
            url: url, //If the file name already exists, a new file with the name 200MB1.zip is created.
            directory: dir, //This folder will be created, if it doesn't exist.
            fileName: `${name}.${type}`,
            cloneFiles: clonefiles || false
        });
        await downloader.download();
    } catch(e) {};
};

async function getDate() {
    let date = new Date().toDateString();
    return date;
};

async function fetchTime(tz, format) {
    let datethingy = moment.tz(tz).format(format);
    return datethingy;
};

async function getRandomArray(array) {
    let bruh = array[Math.floor(array.length * Math.random())];
    return bruh;
};

async function checkIfHex(item) {
    if(item.toUpperCase().startsWith('#')) {
        return { pass: true };
    } else {
        return { pass: false, item: `#${item}` };
    };
};

async function dirSize(directory) {
    let final;
    let bytes = fastFolderSizeSync(directory);
    final = await converter(bytes, 'B', 'MB'); // Bytes to MB
    final = Number(final).toFixed(2);
    return final;
};

async function getDiscountedValue(totalValue, discount) { // 34.99 and 20 for a 20% discount
    let a = totalValue - ((totalValue / 10) * (discount * .10));
    return a;
};

module.exports = {
    figlify: figlify,
    mdConvert: mdConvert,
    generateRandom: generateRandom,
    sanitize: sanitize,
    saveFile: saveFile,
    getDate: getDate,
    fetchTime: fetchTime,
    getRandomArray: getRandomArray,
    checkIfHex: checkIfHex,
    dirSize: dirSize,
    getDiscountedValue: getDiscountedValue
};
