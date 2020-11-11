var ML_API_URL = "https://api.mercadolibre.com/";
var ML_API_URI = ML_API_URL + "sites/MLA/search?q=";
var ML_ITEM_URI = ML_API_URL + "/items/";
var ML_ITEM_URI2 = ML_API_URL + `/items/:id/description`;

module.exports = {
    ML_API_URL,
    ML_API_URI,
    ML_ITEM_URI,
    ML_ITEM_URI2
}