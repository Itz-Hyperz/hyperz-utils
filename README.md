# Hyperz Utilities
A simple utilities package that offers many different functions that could be of use to you when writing ExpressJS websites or Discord bots!

Initialise package:
```js
const utils = require('hyperz-utils');
```

---

# Functions / Exports
- [figlify](#figlify)
- [mdConvert](#mdConvert)
- [generateRandom](#generateRandom)
- [sanitize](#sanitize)
- [saveFile](#saveFile)
- [getDate](#fetchTime)
- [getRandomArray](#getRandomArray)
- [verifyColorHex](#verifyColorHex)
- [dirSize](#dirSize)

---

# figlify
Used to turn text into art!
```js
    await utils.figlify("Hello World!", { randFont: true, font: undefined });
```

# mdConvert
Convert Markdown to HTML with custom CSS classes.
```js
    let text = "# Hello world!";
    let webPageContent = utils.mdConvert(text);
```

# generateRandom
Get a randomised string.
```js
    let random = utils.generateRandom(12);
```

# sanitize
Make a string of text MySQL compatible to avoid injections.
```js
    let text = "oh hello world`; DROP DATABASE main;";
    let cleansed = utils.sanitize(text, false)
```

# saveFile
Download a file from a URL locally to the machine.
```js
    utils.saveFile("https://example.com/logo.png", "/home/logo.png", {});
```

# getDate
Get the current date.
```js
    utils.getDate();
```

# getRandomArray
Get a random index from an array.
```js
    
    let array = ["a", "b", "c", "d", "e", "f"];
    let random = utils.getRandomArray(array);
```

# verifyColorHex
Check if the provided string is a valid color hex.
```js
    
    let hex = "#FFFFFF";
    let check = utils.verifyColorHex(hex);
```

# dirSize
View the directory size of a folder in bytes.
```js
    let size = await utils.dirSize("./src/images");
```

---

# Credits
- [@Hyperz](https://hyperz.net) - *Creating the package.*
- [@FAXES](https://github.com/FAXES) - *V2.0.0 rewrite.*
- [@HypnoticSiege](https://quezada.nl) - *V2.0.0 rewrite.*