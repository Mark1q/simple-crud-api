const validateSortQueries = (query) => {
    const SORTABLE_FIELDS = ['name', 'quantity', 'price', 'createdAt','updatedAt'];
    let sort = {};

    if (query.sortBy) {
        const [field, order] = query.sortBy.split(':');

        if (SORTABLE_FIELDS.includes(field)) {
            sort[field] = order === 'desc' ? -1 : 1;
        } 
    }

    // If no valid field was added, use default
    if (Object.keys(sort).length === 0) {
        sort = { createdAt: 1 };
    }

    return sort;
};


module.exports = {
    validateSortQueries
}

