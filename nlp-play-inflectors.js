/**
 * Created by jefferson.wu on 5/5/17.
 */

const natural = require('natural');

var noun_inflector = new natural.NounInflector();

console.log(noun_inflector.pluralize('mouse'));
console.log(noun_inflector.singularize('tomatoes'));

// for some reason this is NOT a constructor.
var count_inflector = natural.CountInflector;


for (var i = 0; i < 100; i++) {
    console.log(count_inflector.nth(i));
}

