import express from 'express'
import request from 'request'

//Initialise the router
const router = express.Router()

router.post('/:id', (req, res)=>{
    const num = req.params.id
    console.log(fetchFileContents())
})

router.get('**', (req, res)=>{
    res.send({msg:'Error 404: You are lost.'})
})

//Fetches and returns the content of the file
const fetchFileContents = function(){
    request.get('http://terriblytinytales.com/test.txt', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = body;
            return data.toString()
        }
        return null;
    });
}

const topKFrequent = function(string, k) {
    //converting string to words
    const words = string.split(' ')
    //generating wordcount
    const wc = words.reduce((a, b) => {
      a[b] ? a[b]++ : a[b] = 1;
      return a;
    }, {});
    return Object.keys(wc).sort((a, b) => {
      if (wc[a] > wc[b]) return -1;
      if (wc[b] > wc[a]) return 1;
      else {
        return a.localeCompare(b);
      }
    }).slice(0, k);
  };