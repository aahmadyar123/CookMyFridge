const mongoose = require("mongoose");

// Find a document by name or all documents if name is undefined
async function findDocs(model, name) {
  let result;
  if (name === undefined) {
    result = await model.find();
  } else if (name) {
    result = await findDocByName(name);
  }
  return result;
}

// Find a document by any field
async function findDocByField(model, field, value) {
  return await model.findOne({ [field]: value });
}

// Populate a field of a document (find the document by id)
async function populateField(model, documentId, field) {
  return await model.findById(documentId).populate(field).exec();
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

// Adds a reference to a document within a doc-reference field
// - validates the reference exists
async function addRef_validated(model, documentId, field, referenceId) {
  try {
    // validate the document exists
    const isValidDoc = await model.exists({ _id: documentId });
    if (!isValidDoc) {
      throw new Error("Utility : Invalid document ID.");
      return false;
    }
    // validate the reference exists
    const isValidReference = await model.exists({ _id: referenceId });
    if (!isValidReference) {
      throw new Error("Utility : Invalid reference ID.");
      return false;
    }
    // validate the field exists in the document
    const isValidField = await model.exists({
      _id: documentId,
      [field]: { $exists: true },
    });
    if (!isValidField) {
    }
    // validate the field is an array of references (ObjectId types)
    const isValidArray = await model.exists({
      _id: documentId,
      [field]: { $type: "array" },
    });
    if (!isValidArray) {
    }

    // add the reference to the field
    const document = await model.findById(documentId);
    document[field].push(referenceId);

    // Save the updated document
    const updatedDocument = await document.save();

    return updatedDocument;
  } catch (error) {
    throw new Error(`Failed to add reference to ${field}: ${error.message}`);
  }
}

module.exports = {
  findDocs,
  findDocByField,
  populateField,
  createDoc,
  addRef_validated,
};
