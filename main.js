const fs = require('fs');
const path = require('path')
const fileDl = require("fax-downloader");
const figlet = require('figlet');
const md = require('markdown-it-faxes')({
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: false // Autoconvert URL-like text to links
}).use(require('markdown-it-highlightjs'), { code: true });
let defaultFonts = ["Graffiti", "Standard", "Stop", "Slant", "Pagga", "Larry 3D"];

function figlify(text, options) {
    if (typeof options.font == 'undefined') {
        if (typeof options.randFont == 'undefined' || options.randFont == false) {
            figlet.text(text, { font: 'Standard', width: options.width || 700 }, function(err, data) {
                if (err) throw err;
                let str = `${data}\n-------------------------------------------`
                console.log(chalk.bold(chalk.blueBright(str)));
            });
        } else {
            let chosen = getRandomArray(defaultFonts);
            figlet.text(text, { font: chosen, width: options.width || 700 }, function(err, data) {
                if (err) throw err;
                let str = `${data}\n-------------------------------------------`
                console.log(chalk.bold(chalk.blueBright(str)));
            });
        }
    } else {
        figlet.text(text, { font: options.font, width: options.width || 700 }, function(err, data) {
            if (err) throw err;
            let str = `${data}\n-------------------------------------------`
            console.log(chalk.bold(chalk.blueBright(str)));
        });
    }
};

/**
 * Convert Markdown to HTML
 * @param {String} content what to convert
 * @returns {String} HTML
 */
function mdConvert(content) {
    return md.render(content);;
};

/**
 * Get a randomised string.
 * @param {Number} length amount of characters to generate
 */
function generateRandom(length) {
    let r = '';
    let c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        r += c.charAt(Math.floor(Math.random() * c.length));
    }
    return r;
};

/**
 * 
 * @param {String} value value to sanitize
 * @param {Boolean} bypassScripting Remove HTML tags?
 * @returns {String} sanitized SQL values
 */
function sanitize(value, bypassScripting) {
    if (!bypassScripting || typeof bypassScripting == 'undefined') {
        if (value.toLowerCase().includes('</')) {
            value = value.replaceAll('<', 'NULLED:lessThan').replaceAll('>', 'NULLED:greaterThan');
        };
    };
    value = value.replaceAll('"', '\'').replaceAll('`', '\`').replaceAll("'", "''");
    return value;
};

/**
 * 
 * @param {String} url The URL to fetch the file from
 * @param {String} dest Destination to download the files to
 * @param {Object} options Request options. Eg; header {}
 * @returns {Boolean}
 */
function saveFile(url, dest, options = {}) {
    try {
        fileDl.getFile(url, dest, options).then(function(filename) {
            return true;
        });
    } catch (e) {
        return false
    };
};

/**
 * Get the current date. 
 * @returns {Object}  Returns the date string and unix timestamp.
 */
function getDate() {
    return { s: new Date().toDateString(), n: Date.now() };
};

/**
 * Get a random index from an array.
 * @param {Array} array 
 * @returns {number} the random index
 */
function getRandomArray(array) {
    return array[Math.floor(array.length * Math.random())];
};


/**
 * Verify hex color code.
 * @param {String} hex 
 * @returns {Boolean} boolean if HEX valid or not
 */
function verifyColorHex(hex) {
    let rx = /^#([0-9a-f]{3}){1,2}$/i;
    if (rx.test(hex)) return true;
    return false;
};

/**
 * Get the directory size
 * @param {String} directory The directory to get the total size of
 * @return {Number} Value of the directory size in bytes.
 */
async function dirSize(d) {
    let f = fs.readdirSync(d);
    let s = f.map(file => fs.statSync(path.join(d, file)));
    return (await Promise.all(s)).reduce((acc, { size }) => acc + size, 0)
};

module.exports = {
    figlify: figlify,
    mdConvert: mdConvert,
    generateRandom: generateRandom,
    sanitize: sanitize,
    saveFile: saveFile,
    getDate: getDate,
    getRandomArray: getRandomArray,
    verifyColorHex: verifyColorHex,
    dirSize: dirSize
};