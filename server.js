const { json } = require('express')
const express=require('express')
const {animals}=require('./data/animals.json')

const app = express()

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`)
})

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if(result){
    res.json(result);
  }else{
    res.send(404)
  }
   
});


app.get('/api/animals', (req, res) => {
  let results=animals
  console.log(req.query)
  if(req.query){
  results = filterByQuery(req.query, results);
  }
  res.json(404)
})


function findById(id,animalArray){
    const result=animalArray.filter(animal=>animal.id===id)[0];
    return result
}

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
  
  
  
  return filteredResults;
}