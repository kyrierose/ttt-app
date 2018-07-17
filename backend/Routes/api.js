import express from 'express'
import request from 'request'

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

router.get('/:id', (req, res)=>{    
    //Holds value of N passed
    const num = req.params.id
    //variables
    let downloaded_text
    let final_array = []
    
    //Promise init
    var initializePromise = intialize();
    initializePromise.then(function(result) {
        downloaded_text = result;
        
        let freqObj = topFrequent(downloaded_text)
        
        //Dumb code follows
        for(let index=0;index<num;index++){
            //get key for max object
            let max_element_key = Object.keys(freqObj).reduce((a, b) => freqObj[a] > freqObj[b] ? a : b)
            let max_element_value = freqObj[max_element_key]
            //create a new temp
            let tempObject = { 
                word : max_element_key, 
                freq : max_element_value
            }
            //pushing temporary object to array
            final_array.push(tempObject)
            //remove max_element from freqObj
            delete freqObj[max_element_key]
        }
        res.send(final_array)
    }, function(err) {
        console.log(err);
        res.send({msg: 'Error fetching the data.', status:500})
    })
})
export default router