/**
 * Created by jefferson.wu on 5/18/17.
 */

const natural = require('natural');
const fs = require('fs');

var tokenizer = new natural.WordTokenizer();

var text = fs.readFileSync('lots_of_text.txt', 'utf-8');
var corpus = tokenizer.tokenize(text);
var spell_check = new natural.Spellcheck(corpus);


// console.log(spell_check.isCorrect('birtday'));
// console.log(spell_check.getCorrections('birtday'));

var sentence = 'Tey hade truble fiinding th thng'.split(' ');

sentence.forEach(function(word, ind, arr) {
    console.log(spell_check.isCorrect(word));
    console.log(spell_check.getCorrections(word));
});