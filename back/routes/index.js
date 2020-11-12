const router = require('express').Router();
const rx = require('../lib/request-executor');
const CONST = require('../lib/constants');

router.get('/api/items', (req, res) => {
    let queryParam = req.query.q;
    let requestOptions = {
        url: CONST.ML_API_URI + queryParam + '?limit=4',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        isList: true,
    }

    let response = rx.get(requestOptions);
    
    response.then((newResponse) => {
        res.json(newResponse);
    });
});

router.get('/api/items/:id', (req, res) => {
    let id = req.params.id;

    let requestOptions = {
        url: CONST.ML_ITEM_URI + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        isList: false,
    }

    let response = rx.get(requestOptions);
    
    response.then((newResponse) => {
        res.json(newResponse);
    });
});

module.exports = router;