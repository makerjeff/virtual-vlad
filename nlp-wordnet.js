/**
 * Created by jefferson.wu on 5/17/17.
 */

// prereq: install npm wordnet-db module first.
const natural = require('natural');

var wordnet = new natural.WordNet();

var my_word = 'desert';

// look up all versions of the word
wordnet.lookup(my_word, function(results){
    results.forEach(function(result, ind, arr) {
        console.log('\n');
        console.log(result.synsetOffset);
        console.log(result.pos);
        console.log(result.synonyms);
        console.log(result.gloss);
    });
});

// look up word directly based on synset ##
wordnet.get(8522594, 'n', function(result) {
    console.log(result.gloss);
});