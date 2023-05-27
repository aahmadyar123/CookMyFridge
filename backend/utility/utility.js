
// Find a document by name
async function findDocByName(model, name) {
    return await model.find({name: name});
}

// Find a document by any field
async function findDocByField(model, field, value) {
    return await model.findOne({ [field]: value });
}

// Populate a field of a document (find the document by id)
async function populateField(model, documentId, field) {
    return await model
      .findById(documentId)
      .populate(field)
      .exec();
}

// Create a document
// - returns the saved document if successful
// - returns false if unsuccessful
async function createDoc(model, document) {
    try {
        const documentToAdd = new model(document);
        const savedDocument = await documentToAdd.save();
        return savedDocument;
    } catch (error) {
        console.log(error);
        return false;
    }
}
  

module.exports = {
    findDocByName,
    findDocByField,
    populateField,
    createDoc,
}
  