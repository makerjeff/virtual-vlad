/**
 * Created by jefferson.wu on 5/5/17.
 */

const natural = require('natural');

var ngrams = natural.NGrams;

var my_string = "Jane Smith, along with Mary Adams and John Black, craeted the project. ";

// bigrams TODO: what is this?
console.log(ngrams.bigrams(my_string));

// tri-grams TODO: what is this?
console.log(ngrams.trigrams(my_string));

// n-grams
console.log(ngrams.ngrams(my_string, 5));