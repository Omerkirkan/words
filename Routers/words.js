const express = require('express');
const router = express.Router();

const Word = require('../Models/Word');

router.get('/', (req, res) => {
    Word.find()
        .then(words => res.json(words))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
    const { enword, trword } = req.body;
    if (enword && trword) {
        const newWord = new Word({
            enword,
            trword
        });
        newWord.save()
            .then(() => res.json('Word added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(400).json('Error: Please fill all fields');
    }
});

router.delete('/:id', (req, res) => {
    Word.findById(req.params.id)
    .then(word => {
        if (word) {
            word.remove()
                .then(() => res.json('Word deleted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        } else {
            res.status(400).json('Error: Word not found');
        }
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
