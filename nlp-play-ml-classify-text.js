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
    {text: 'Your business trip is confirmed for Monday the 4th', label: 'spam'},
    {text: ''}
];


// need to have test data:

