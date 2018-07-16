import express from 'express'
import request from 'request'
import { SSL_OP_NO_TLSv1_2 } from 'constants';

//Initialise the router
const router = express.Router()

//Store data object
let data = undefined, result = undefined

//Fetching data asynchronously
let async = () => {
    //Fetches and returns the content of the file
    request.get('http://terriblytinytales.com/test.txt', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = body
        }
    });
}
async()

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

//Wait until data is not empty
function callback(num, res){
    if(data === undefined)
        setTimeout(callback(num, res), 1000)
    console.log("Download data done")
    let freqObj = topFrequent(data)
    
    let final_object = {}
    
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
}
router.post('/:id', (req, res)=>{    
    const num = req.params.id
    callback(num, res)
})
export default router