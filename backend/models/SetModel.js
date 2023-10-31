const { query } = require("../db");

const SetModel = {

  //function to fetch the instruments that are associated with a particular set.
  async getInstrumentsInSet(setId) {
    console.log(setId); 
    return query(
      "SELECT instruments.* FROM instruments " +
      "INNER JOIN instruments_sets ON instruments.id = instruments_sets.instrument_id " +
      "WHERE instruments_sets.set_id = ?",
      [setId]
    );
  },

//funnction to add new instrument to set
  async addNewInstrumentToSet(setId, newInstrumentData) {
    const { instrumentName, instrumentId, instrumentQuantity, instrumentLocation } = newInstrumentData;
    const result = await query(
      "INSERT INTO instruments (instrument_name, instrument_id, instrument_quantity, instrument_location) VALUES (?, ?, ?, ?)",
      [instrumentName, instrumentId, instrumentQuantity, instrumentLocation]
    );

    const newInstrumentId = result.insertId;
    console.log(newInstrumentId)

    await query("INSERT INTO instruments_sets (set_id, instrument_id) VALUES (?, ?)", [setId, newInstrumentId]);
  
    return newInstrumentId;
  },

  /* 
async addNewInstrumentToSet(setId, newInstrumentData) {
  const { instrumentName, instrumentId, instrumentQuantity, instrumentLocation } = newInstrumentData;

  // Checking if the instrument with the given instrument_id already exists
  const existingInstrument = await query("SELECT instrument_id FROM instruments WHERE instrument_id = ?", [instrumentId]);

  if (existingInstrument.length > 0) {
    const existingInstrumentId = existingInstrument[0].instrument_id;

    await query("INSERT INTO instruments_sets (set_id, instrument_id) VALUES (?, ?)", [setId, existingInstrumentId]);

    return existingInstrumentId;
  } else {
    // if The instrument doesn't exist insert it into the instruments table
    const result = await query(
      "INSERT INTO instruments (instrument_name, instrument_id, instrument_quantity, instrument_location) VALUES (?, ?, ?, ?)",
      [instrumentName, instrumentId, instrumentQuantity, instrumentLocation]
    );

    const newInstrumentId = result.insertId;

    await query("INSERT INTO instruments_sets (set_id, instrument_id) VALUES (?, ?)", [setId, newInstrumentId]);

    return newInstrumentId;
  }
},*/
  
  
  // function to delete an instrument from the set
  async deleteInstrumentFromSetById(instrumentId, setId) {
    return query(
      "DELETE FROM instruments_sets WHERE instrument_id = ? AND set_id = ?", [instrumentId, setId]
    )
  },

  async getInstrumentById(instrumentId) {
    return query("SELECT * FROM instruments WHERE id = ?", [instrumentId]);
  },

  async getAllSets() {
    return query("SELECT * FROM sets");
  },

  async getSet(id) {
    return query("SELECT * FROM sets WHERE id=?", [id]);
  },

  async addSet(setData) {
    const { setName, setId, setQuantity, setLocation } = setData;
    return query(
      "INSERT INTO sets (set_name, set_id, set_quantity, set_location) VALUES (?, ?, ?, ?)",
      [setName, setId, setQuantity, setLocation]
    );
  },

  async updateSet(setIdToUpdate, updatedData) {
    const { setName, setId, setQuantity, setLocation } = updatedData;
    return query(
      "UPDATE sets SET set_name = ?, set_id = ?, set_quantity = ?, set_location = ? WHERE id = ?",
      [setName, setId, setQuantity, setLocation, setIdToUpdate]
    );
  },

  async deleteSet(setId) {
    return query("DELETE FROM sets WHERE id = ?", [setId]);
  },
};
module.exports = SetModel;
