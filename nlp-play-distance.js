/**
 * Created by jefferson.wu on 5/11/17.
 */

const natural = require('natural');

var string1 = 'close';
var string2 = 'closer';
var string3 = 'figghdfjkad';

// NOTE: JaroWinkler algorithm is best for:
// short words, names, and finding duplicates.

console.log(natural.JaroWinklerDistance(string1, string2));
console.log(natural.JaroWinklerDistance(string1, string3));


// NOTE: Levenshtein distance:
// returns number of edits required to transform first string into second.
// insertion, deletion, or substitution of a character.
console.log(natural.LevenshteinDistance(string1, string2));
console.log(natural.LevenshteinDistance(string1, string3));

// NOTE: DiceCoefficient:
console.log(natural.DiceCoefficient(string1, string2));
console.log(natural.DiceCoefficient(string1, string3));