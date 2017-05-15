/**
 * Created by jefferson.wu on 5/11/17.
 */

const natural = require('natural');

var classifier = new natural.BayesClassifier();

// need to have training data (60-80%):
var training_data = [
    {text: 'RE: Canadian drugs now on sale', label: 'spam'},
    {text: 'Earn more from home', label: 'spam'},
    {text: 'Information now available!!!', label: 'spam'},
    {text: 'Earn easy cash', label: 'spam'},
    {text: 'Your business trip is confirmed for Monday the 4th', label: 'notspam'},
    {text: 'Project planning - next steps', label: 'notspam'},
    {text: 'Birthday party next weekend', label: 'notspam'},
    {text: 'Drinks on Monday?', label: 'notspam'}
];

// need to have test data:
var test_data = [
    {text: 'Drugs for cheap', label: 'spam'},
    {text: 'Next deadline due Monday', label: 'notspam'},
    {text: 'Meet me at home?', label: 'notspam'},
    {text: 'Hang out with someone near you', label: 'spam'}
];

// add training data
training_data.forEach(function(elem,ind,arr) {
    classifier.addDocument(elem.text, elem.label);
});

// train classifier
classifier.train();

test_data.forEach(function(elem, ind, arr) {
    var label_guess = classifier.classify(elem.text);
    console.log('\n');
    console.log(elem.text);
    console.log("label: " + label_guess);
    console.log(classifier.getClassifications(elem.text));
});

