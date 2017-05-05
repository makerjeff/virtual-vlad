/**
 * Created by jefferson.wu on 5/5/17.
 */

//TODO: OLD SYNTAX
// var natural = require('natural');
// var Tagger = natural.BrillPOSTagger;
//
// var my_string = 'Lys soldered the beatiful jewelry pieces'.split(' ');
//
// var base_folder = process.cwd() + '/node_modules/natural/lib/natural/brill_pos_tagger';
// var rules = base_folder + '/data/English/tr_from_posjs.txt';
// var lexicon = base_folder + '/data/English/lexicon_from_posjs.json';
//
// var default_category = 'N';
//
// console.log(base_folder);
//
// var tagger = new Tagger(lexicon, rules, default_category, function(err){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(tagger.tag(my_string));
//     }
// });

// TODO: NEW SYNTAX
// https://github.com/handav/nlp-in-javascript-with-natural/issues/1
var natural = require('natural');
var Tagger = natural.BrillPOSTagger;

var my_string = "Lys soldered the beautiful jewelry pieces.".split(' ');

var base_folder = process.cwd() + '/node_modules/natural/lib/natural/brill_pos_tagger';
var rules_filename = base_folder + '/data/English/tr_from_posjs.txt';
var lexicon_filename = base_folder + '/data/English/lexicon_from_posjs.json';
var default_category = 'N';

var lexicon = new natural.Lexicon(lexicon_filename, default_category);
var rules = new natural.RuleSet(rules_filename);
var tagger = new Tagger(lexicon, rules);

console.log(tagger.tag(my_string));
console.log(JSON.stringify(tagger.tag(my_string)));
