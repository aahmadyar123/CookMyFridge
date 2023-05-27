
// Find a document by name
async function findDocByName(model, name) {
    return await model.find({name: name});
}

// Find a document by any field
async function findDocByField(model, field, value) {
    return await model.findOne({ [field]: value });
}
  