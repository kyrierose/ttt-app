import express from 'express'
import request from 'request'
import { SSL_OP_NO_TLSv1_2 } from 'constants';

//Initialise the router
const router = express.Router()

const topFrequent = function(string) {
    //converting string to words
    const words = string.split(' ')
    //generating wordcount
    const wc = words.reduce((a, b) => {
      a[b] ? a[b]++ : a[b] = 1;
      return a;
    }, {});
    return wc
};

function intialize(){
    return new Promise((resolve, reject)=>{
        request.get('http://terriblytinytales.com/test.txt', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
            else
                reject(err)
        });
    })
}

let downloaded_text
let final_object = {}

router.post('/:id', (req, res)=>{    
    const num = req.params.id
    //callback(num, res)
    var initializePromise = intialize();
    initializePromise.then(function(result) {
        downloaded_text = result;
        
        let freqObj = topFrequent(downloaded_text)
        
        //Dumb code follows
        for(let index=0;index<num;index++){
            //get key for max object
            let max_element_key = Object.keys(freqObj).reduce((a, b) => freqObj[a] > freqObj[b] ? a : b)
            let max_element_value = freqObj[max_element_key]
            //push these key-value to new object
            final_object[max_element_key] = max_element_value
            //remove max_element from freqObj
            delete freqObj[max_element_key]
        }
        res.send(JSON.stringify(final_object))
    }, function(err) {
        console.log(err);
        res.send({msg: 'Error fetching the data.', status:500})
    })
})
export default router