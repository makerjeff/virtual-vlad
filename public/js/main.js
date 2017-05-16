/**
 * Created by jefferson.wu on 5/11/17.
 */

    // ==========================
    // HANDLES & VARS ===========
    // ==========================
var d                   = document;
var search_container    = d.getElementById('search_container');
var title               = d.getElementById('title');
var input_form          = d.getElementById('input_form');
var input_field         = d.getElementById('input_field');
var result_div          = d.getElementById('result_container');

// ---------------------------
// Speech Synthesis ----------
// ---------------------------

var voices;
var voice_to_use;

//TODO: get these from server.
var greeting_db = [
    'Welcome to Virtual Vlad.',
    'Hello there.',
    'Hi.',
    'Hello human.',
    'Greetings.',
    'Greetings human.'
];

var query_db = [
    'What seems to be the problem?',
    'How can I help you today?',
    'Please state the nature of your technical emergency.',
    'How may I be of assistance?'
];


// ===========================
// EVENTS ====================
// ===========================

title.addEventListener('click', function(e) {
    utter_me(get_random_greeting());
});

// ---------------------------
// SUBMIT EVENT --------------
// ---------------------------
input_form.addEventListener('submit', function(e) {
    e.preventDefault();
    utter_me(textSanitizer.getSanitizedString(input_field.value));
    VirtualVlad.submit_input(input_field.value);
    input_field.value = '';
});

// ---------------------------
// LOAD EVENT ----------------
// ---------------------------
window.addEventListener('load', function(e) {

    init_speech_synth_voice();          // initialized speech synth voices.
    VirtualVlad.get_questions();        // get questions objects.

    // delay initial greeting
    window.setTimeout(function() {
        utter_me(get_random_greeting());
    }, 500);

});


// ===========================
// functions =================
// ===========================

var Timer = {
    last_time: Date.now(),
    num_in_seconds: 0,
    timer: function() {
        requestAnimationFrame(Timer.timer);

        var current_time = Date.now();

        if(current_time - Timer.last_time >= 1000) {
            console.log('Time elapsed: ' + Timer.num_in_seconds + ' seconds.');

            Timer.last_time = current_time;
            Timer.num_in_seconds++;
        }
    }
};


/**
 * Initialize speech sythesis.
 */
function init_speech_synth_voice() {

    speechSynthesis.onvoiceschanged = function() {
        voices = speechSynthesis.getVoices();
        voices.forEach(function(elem, ind, arr) {
            if(elem.voiceURI === 'Google UK English Male') {
                voice_to_use = elem;
            }
        });
    };
}

/**
 * Utter the message provided.
 * @param sanitized_message Sanitized string for the speechSynth to say.
 */
function utter_me(sanitized_message) {
    var utter_this = new SpeechSynthesisUtterance(sanitized_message);

    console.log('Saying: "' + sanitized_message + '"');

    utter_this.voice    = voice_to_use;
    utter_this.volume   = 1.0;
    utter_this.rate     = 1.0;

    speechSynthesis.speak(utter_this);
}

function get_random_greeting() {
    return greeting_db[Math.floor(Math.random() * greeting_db.length)] + ' ' +
        query_db[Math.floor(Math.random() * query_db.length)];

}

// AJAX
function submit_input(stringy) {
    $.ajax({
        method: 'POST',
        url: '/api/get_stems',
        data: {stringy: stringy},
        success: function(data, status, jqxhr) {
            console.log(data);


            result_div.innerHTML = '';

            //TODO: put into function
            data.payload.data.forEach(function(elem,ind,arr) {
                var q_item = document.createElement('h4');
                q_item.classList.add('question_item', 'animate_fade_in');
                q_item.innerHTML = elem;

                result_div.appendChild(q_item);
            });
        },
        error: function(jqxhr, status, error) {
            console.log(error);
        }
    });
}

// ========================================
// VIRTUAL VLAD MODULE (official build) ===
// ========================================
var VirtualVlad = {
    questions: [],
    submit_input: function(clean_string) {
        $.ajax({
            method: 'POST',
            url: '/api/get_stems',
            data: {stringy: clean_string},
            success: function(data, status, jqxhr) {
                console.log(data);
                result_div.innerHTML = '';

                VirtualVlad.populate_results(data);
            },
            error: function(jqxhr, status, error) {
                console.log(error);
            }
        });
    },
    get_questions: function() {
        $.ajax({
            method: 'GET',
            url: '/api/get_questions',
            success: function(data, status, jqxhr) {
                VirtualVlad.questions = data.payload.data;
                console.log('Successfully loaded VirtualVlad.questions with data from server. ');
            },
            error: function(jqxhr, status, data) {}
        });

    },

    populate_results: function(data) {

        VirtualVlad.draw_results_header(data);

        data.payload.data.forEach(function(elem, ind, arr) {
            var q_item = document.createElement('h4');
            q_item.classList.add('question_item', 'animate_fade_in');
            q_item.innerHTML = elem;

            result_div.appendChild(q_item);
        });
    },
    draw_results_header: function(data) {
        var p = document.createElement('p');
        p.classList.add('animate_fade_in');
        p.innerHTML = 'Your search for <b>"' + data.payload.search_string + '"</b> yielded <b>' + data.payload.data.length + '</b> results.';
        result_div.appendChild(p);
    }
};


/**
 * Filtrator of Words
 */
function filtrator_old (inputStr, dataArray) {
    var returnArr = [];
    var searchText = new RegExp("^" + inputStr.toLowerCase(), 'g'); //creates RegExpression out of text input, TODO: anchor to only beginning
    //console.log(searchText);

    dataArray.forEach(function(elem, ind, arr){
        // check to see if string is in file name, if so push to array
        if (elem.search(new RegExp(searchText, 'g')) !== -1) {
            returnArr.push(elem);
        }
    });
    //Debug.log(returnArr);   //array filtered from what was typed.
    return returnArr;
}

