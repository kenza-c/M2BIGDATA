var db = require('../model/modelDB')
var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const OpenAI = require ("openai");

const openai = new OpenAI({apiKey:process.env.OPENAI_KEY})

const removeTags = (text) => {
    return text
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

router.post('/', async function(req, res) {
  console.log(req.body);
  const url = req.body.url;
  const lang = req.body.language;

  const rpResponse = await rp(url);
  console.log(rpResponse);
  const parsedText= removeTags(rpResponse);
  
db.findOne({ url: url })
  .then(existingDoc => {
    if (existingDoc) {
      console.log('Document already exists:', existingDoc);
    } else {
      // Create a new document
      const newDBURL = new db({ url: url });

      // Save the document to the database using promises
      newDBURL.save()
        .then(result => {
          console.log('Document saved:', result);
        })
        .catch(err => {
          console.error(err);
        });
    }
  })
  .catch(err => {
    console.error(err);
  });
  const completion = await openai.chat.completions.create({
    max_tokens:1024,
    model:"gpt-3.5-turbo",
    messages:[
      {"role": "system", "content": "This is the content of the website of a company , summarize it in a few sentences(3-4) so that we know what they do. I need you to give me your summary in "+lang},
      {"role": "user", "content": parsedText}
    ]
  }
    
)
res.send(completion.choices[0]);

}
);
 


  module.exports = router;
  