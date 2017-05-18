/**
 * Created by jeffersonwu on 5/17/17.
 */

const natural = require('natural');
var trie = new natural.Trie(false);     // true: case sensitive


var bird_names = [
    'albatross', 'anhinga', 'auklet', 'avocet', 'bishop',
    'bittern', 'blackbird', 'bluebird', 'bobolink', 'booby', 'brant', 'bufflehead',
    'bunting', 'canvasback', 'coot', 'cormorant', 'cowbird', 'crane', 'creeper',
    'crossbill', 'crow', 'cuckoo'
];

bird_names.forEach(function(item, ind, arr) {
    trie.addString(item);
});

console.log(trie.contains('crane'));
console.log(trie.keysWithPrefix('bl'));             // prefix searches
console.log(trie.findMatchesOnPath('crowingly')); // rough searches