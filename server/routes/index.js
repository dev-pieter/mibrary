var express = require('express');
var router = express.Router();
const {google} = require('googleapis');

/* GET home page. */
router.get('/:at/books', async (req, res) => {
  var { at } = req.params

  try {
    response1 = await google.books('v1').mylibrary.bookshelves.volumes.list({
        shelf: '1001',
        access_token: at,
    })

    res.status(200).json(response1);
  } catch (error) {
    res.status(400).json({message: `${error}`});
  }

});

router.get('/books/:params', async (req, res) => {
  const { params } = req.params;
  
  try {
    response1 = await google.books('v1').volumes.list({
      q: params,
      maxResults: 10,
    })

    res.status(200).json(response1);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: `${error}`});
  }

});

router.get('/:at/:id/add', async (req, res) => {
  const {at, id} = req.params;

  try {
    response1 = await google.books('v1').mylibrary.bookshelves.addVolume({
      shelf: '1001',
      access_token: at,
      volumeId: id,
    })

    res.status(200).send('Book added Successfully');
  } catch (error) {
    console.log(error);
    res.status(400).json({message: `${error}`});
  }
});

module.exports = router;
var express = require('express');
var router = express.Router();
