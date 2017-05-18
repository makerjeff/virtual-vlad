/**
 * Created by jefferson.wu on 5/11/17.
 */

const natural = require('natural');
const fs = require('fs');

// var classifier = new natural.BayesClassifier();
var classifier = new natural.LogisticRegressionClassifier();

// science and space, or politics.
fs.readFile(process.cwd() + '/_temp/training_data.json', 'utf-8', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        var training_data = JSON.parse(data);
        console.log(training_data);
        train(training_data);
    }
});

function train(training_data) {
    console.log('Training...');

    training_data.forEach(function(item, ind, arr) {
        classifier.addDocument(item.text, item.label);
    });

    var start_time = new Date();
    classifier.train();
    var end_time = new Date();
    var training_time = (end_time - start_time) / 1000.0;

    console.log("Training time:", training_time, "seconds");

    load_test_data();
}

function load_test_data() {
    console.log('Loading test data');

    fs.readFile(process.cwd() + '/_temp/test_data.json', 'utf-8', function(err, data) {
        if(err) {
            console.log(err);
        } else {
            var test_data = JSON.parse(data);
            test_classifier(test_data);
        }
    });
}

function test_classifier(test_data) {
    console.log("Testing classifier.");

    var num_correct = 0;

    test_data.forEach(function(item, ind, arr) {
        var label_guess = classifier.classify(item.text);

        if (label_guess === item.label) {
            num_correct++;
        }
    });
    console.log("Correct %:", num_correct/test_data.length);
}
