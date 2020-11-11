const _conditionalParse = (data) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        return e;
    }
}

exports.conditionalParse = _conditionalParse;