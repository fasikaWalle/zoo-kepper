const { json } = require('express')
const express=require('express')
const {animals}=require('./data/animals.json')

const app = express()


app.get('/api/animals', (req, res) => {
  let results=animals
  console.log(req.query)
  if(req.query){
  results = filterByQuery(req.query, results);
  }
  res.json(results)
})

app.listen(3001, () => {
  console.log(`API server now on port 3001!`)
})


function filterByQuery(query, animalsArray) {
  let filteredResults = animalsArray;
  let resultArr=[]
if(query.personalityTraits){
  if(typeof query.personalityTraits==='string'){
  resultArr=[query.personalityTraits]
  }
 else {
  resultArr=query.personalityTraits
 }
  resultArr.forEach(trait => {
    filteredResults=filteredResults.filter(animal=>animal.personalityTraits.indexOf (trait)!==-1)
  });

}

  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  if(query.id){
    filteredResults=filteredResults.filter(animal=>animal.id===query.id);
  }
  
  return filteredResults;
}