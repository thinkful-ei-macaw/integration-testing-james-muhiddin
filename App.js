
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const data = require('./data.js');

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {

  let { genre, sort } = req.query;
  
  genre = genre && genre.toLowerCase();
  sort = sort && sort.toLowerCase();

  if (sort) {
    if(!['rating', 'app'].includes(sort)) {
      return res  
        .status(400)
        .send('Sort must be either rating or app');
    }
  }

  if(!genre) {
    return res  
      .send(data);
  }

  if (genre) {
    if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genre)) {
      return res  
        .status(400)
        .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card');
    }
  }


  let results = data.filter(
    item => item.Genres.toLowerCase().includes(genre)
  );

  if (sort === 'app') {
    results
      .sort((a, b) => {
        return a['App'].toLowerCase() > b['App'].toLowerCase() ? 1 : 
          a['App'].toLowerCase() < b['App'].toLowerCase() ? -1 : 0;
      });
  }

  if (sort === 'rating') {
    results
      .sort((a, b) => {
        return a['Rating'] < b['Rating'] ? 1 : 
          a['Rating'] > b['Rating'] ? -1 : 0;
      });
  }

  res.json(results);

});

module.exports = app;