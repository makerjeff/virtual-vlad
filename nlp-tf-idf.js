/**
 * Created by jefferson.wu on 5/17/17.
 */

const natural = require('natural');

// for larger documents. articles, bigger text documents.
// term frequency - inversed document frequency.
var tfidf = new natural.TfIdf();

var documents = [
    "The Justice Department on Wednesday appointed former FBI Director Robert Mueller as special counsel to oversee the federal investigation into Russian interference in the 2016 election, including potential collusion between President Donald Trump's campaign associates and Russian officials.",
    "Mueller's appointment aims to quell the wave of criticism that Trump and his administration have faced since Trump fired FBI Director James Comey last week in the middle of the FBI's intensifying investigation into contacts between Trump campaign associates and Russian officials.",
    "I think it was the right thing to do and I believe they saw it as the right thing to do otherwise they're going to have a fight and it's not worth the fight,\" Feinstein said. \"There (is) mutual suspicion of one side and the other. This clears that up and has a person whose reputation is as good as it gets and he'll be very good.",
    "Trump was meeting with FBI director candidates when the White House was formally told that a special prosecutor had been named in Russia investigation. The White House counsel informed the president.",
    "When George W. Bush's White House chief of staff and White House counsel sought to get an ailing Attorney General John Ashcroft to reauthorize a warrantless domestic surveillance program that the Justice Department had ruled illegal, Mueller and Comey rushed to the hospital to prevent the Bush officials from taking advantage of Ashcroft.",
    "Footage emerges of a protest that turned violent just hours after Turkish President Recep Tayyip Erdogan met with President Donald Trump at the White House.",
    "My printer is falling apart and I can't seem to print anything today at work. Something must be wrong with the damn printer."
];

documents.forEach(function(item, ind, arr) {
    tfidf.addDocument(item);
});

var tf = 2;
var idf = 1 + Math.log(10/(1+3));

var combined_tfidf = tf * idf;
console.log(combined_tfidf);


// can input multiple words
tfidf.tfidfs('counsel director banana', function(doc_index, tfidf_measure) {
    console.log('Document', doc_index, ":",tfidf_measure);
});

// find the most important word in a document
tfidf.listTerms(6).forEach(function(item, ind, arr) {
    console.log(item.term, ':', item.tfidf);
});

// serialize or deserialize a 'corpus'

// save
var json = JSON.stringify(tfidf);
var new_tfidf = new tfidf(JSON.parse(json));