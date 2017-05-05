/**
 * Created by jefferson.wu on 5/5/17.
 */

// TUTORIAL: https://egghead.io/lessons/node-js-break-up-language-strings-into-parts-using-natural
const natural = require('natural');
var my_string = "I'm very surprised! I didn't know you could make it out here tonight. ";

var tokenizer = new natural.WordTokenizer();
// var tokenizer = new natural.WordPunctTokenizer();
// var tokenizer = new natural.TreebankWordTokenizer();
// var tokenizer = new natural.RegexpTokenizer({pattern: /[!?.]/});

console.log(tokenizer.tokenize(my_string));