/**
 * Created by jefferson.wu on 5/8/17.
 */

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

// console.log(tagger.tag(my_string));
// console.log(JSON.stringify(tagger.tag(my_string)));

module.exports.get_tagging_info = function() {};

// =======================
// private functions -----
// =======================
function get_tagging_info(clean_string) {

}