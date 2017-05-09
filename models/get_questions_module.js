/**
 * Created by jefferson.wu on 5/9/17.
 */

const fs = require('fs');

function get_questions_promise() {
    return new Promise(function(resolve, reject) {

        // TODO: without 'utf8', it returns a buffer... which could be useful.
        fs.readFile(process.cwd() + '/models/questions.json', 'utf8', function(err, data) {
            if(err) {
                console.log('Error occurred while trying to retrieve questions.json');
                reject({status: 'error', payload: {message: 'Error occurred while trying to retrieve questions. '}});
            } else {
                resolve({status: 'success', payload: {message:'Succesfully grabbed questions.' , data: JSON.parse(data)}});
            }
        });
    });
}

module.exports.get_questions_promise = get_questions_promise;