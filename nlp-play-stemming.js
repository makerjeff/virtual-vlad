/**
 * Created by jefferson.wu on 5/5/17.
 */

// STEMMING: https://egghead.io/lessons/javascript-find-the-roots-of-words-using-stemming-in-natural

var natural = require('natural');

var stemmer = natural.PorterStemmer;
var my_string = "I'm having trouble with the ada lovelace. I can't get the toner working. Paige sucks. ";


console.log(stemmer.stem('mangoes'));
console.log(stemmer.stem('hearing'));
console.log(stemmer.stem('sadness'));
console.log(stemmer.stem('legitimately'));

// TODO: key for pulling out key words
console.log(stemmer.tokenizeAndStem(my_string));

