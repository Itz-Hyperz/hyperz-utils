# Hyperz Utilities
A simple utilities package that offers many different functions that could be of use to you when writing ExpressJS websites or Discord bots!

---

# Functions / Exports
- [figlify](#figlify)
- [mdConvert](#mdConvert)
- [generateRandom](#generateRandom)
- [sanitize](#sanitize)
- [saveFile](#saveFile)
- [getDate](#fetchTime)
- [fetchTime](#fetchTime)
- [getRandomArray](#getRandomArray)
- [checkIfHex](#checkIfHex)
- [dirSize](#dirSize)

---

# figlify
Used to turn text into art!
```js
    const utils = require('hyperz-utils');
    await utils.figlify("Hello World!", { randFont: true, font: undefined });
```

# mdConvert
Converts raw text/md to HTML compatible.
```js
    const utils = require('hyperz-utils');
    let text = "# Hello world!";
    let webPageContent = await utils.mdConvert(text);
    res.render('index.ejs', { content: webPageContent }); // ExpressJS Framework Example
```

# generateRandom
Generate a random string of acceptable characters.
```js
    const utils = require('hyperz-utils');
    let random = await utils.generateRandom(12) // How long the string should be
    console.log(random);
```

# sanitize
Make a string of text MySQL compatible to avoid injections.
```js
    const utils = require('hyperz-utils');
    let text = "oh hello world`; DROP DATABASE main;";
    let cleansed = await utils.sanitize(text, false) // boolean for <script> replacement in HTML
    await con.query(cleansed, function(err, row) {
        if(err) throw err;
    });
```

# saveFile
Download and save a file from a URL. (NodeJS File Downloader)
```js
    const utils = require('hyperz-utils');
    utils.saveFile("https://hyperz.net/assets/logo.png", "hyperzlogo", "png", "./public/images", false); // boolean is to clone files or not
```

# getDate
Get the date and convert to string with NodeJS.
```js
    const utils = require('hyperz-utils');
    let date = await utils.getDate();
    console.log(date);
```

# fetchTime
Fetch the current time from a certain time zone.
```js
    const utils = require('hyperz-utils');
    let time = await utils.fetchTime("America/New_York", "MM-DD-YYYY"); // https://github.com/Itz-Hyperz/big-ben-bot/blob/main/timezones.json look at values
    console.log(date);
```

# getRandomArray
Get a random element from an array of strings.
```js
    const utils = require('hyperz-utils');
    let array = ["a", "b", "c", "d", "e", "f"];
    let random = await utils.getRandomArray(array);
    console.log(`you got: ${random}!`);
```

# checkIfHex
Check if the provided string is a valid color hex.
```js
    const utils = require('hyperz-utils');
    let hex = "#FFFFFF";
    let check = await utils.checkIfHex(hex);
    if(!check.pass) hex = check.item; // Set to the proper hex value if it's not
    console.log(hex);
```

# dirSize
View the directory size of a folder.
```js
    const utils = require('hyperz-utils');
    let size = await utils.dirSize("./src/images");
    console.log(size);
```

---

# Credits
[@Hyperz](https://hyperz.net) - *Creating the package.*