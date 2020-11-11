const utils = require('./utils');
const request = require('request');
const CONST = require('./constants');

/* 
 * Will return a promise with a request based on the method and options provided
 * @param {String} method The method the request should use
 * @param {Object} options THe options object containing headers and url for the request
 */
const _execute = async (method, options) => {
    return await new Promise((resolve, reject) => {
        request[method](options, (error, response, body) => {
            let data = utils.conditionalParse(body);

            if (!error) {
                resolve(data);
            } else {
                reject(body);
            }
        });
    });
}

const _buildListResponse = async (data) => {
    let results = data.results.slice(0, 4);

    var itemsData = {
        author: {
            name: 'Bruno',
            lastname: 'Maurino'
        },
        categories: await _getCategories(results[0].category_id),
        items: [],
    };

    results.forEach((result) => {
        let item = {
            id: result.id,
            title: result.title,
            price: {
                currency: result.currency_id,
                amount: result.price,
                decimals: 2
            },
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping
        };

        itemsData.items.push(item);
    });

    return itemsData;
}

const _buildItemResponse = async (data) => {
    let itemData = {
        author: {
            name: 'Bruno',
            lastname: 'Maurino'
        },
        categories: await _getCategories(data.category_id, true),
        item: {
            id: data.id,
            title: data.title,
            price: {
                currency: data.currency_id,
                amount: data.price,
                decimals: 2
            },
            picture: data.pictures[0].secure_url,
            condition: data.condition,
            free_shipping: data.shipping.free_shipping,
            sold_quantity: data.sold_quantity,
            description: await _getItemDescription(data.id)
        },
    };

    return itemData;
}

async function _getCategories(categoryId, isItem = false) {
    let options = {
        url: CONST.ML_API_URL + '/categories/' + categoryId
    };

    let categories = [];

    let result = await _execute('get', options);

    result.path_from_root.forEach((category) => {
        categories.push(category.name);
    });

    if (isItem) {
        categories.push(result.name);
    }

    return categories;
}

async function _getItemDescription(id) {
    let options = {
        url: CONST.ML_ITEM_URI + id + '/descriptions',
    }

    let result = await _execute('get', options);

    return result[0].plain_text;
}

const _get = async (options) => {
    try {
        var data = await _execute('get', options);

        if (options.isList) {
            return _buildListResponse(data, options);
        } 

        return _buildItemResponse(data, options);
    } catch (response) {
        console.log('RESPONSE>>>>>', response);
        return response;
    }
}

exports.get = _get;
