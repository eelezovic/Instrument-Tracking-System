const { query } = require("../db");

const SetModel = {
  async getAllSets() {
    return query("SELECT * FROM sets");
  },

  async addSet(setData) {
    const { setName, setId, setQuantity, setLocation } = setData;
    return query(
      "INSERT INTO sets (set_name, set_id, set_quantity, set_location) VALUES (?, ?, ?, ?)",
      [setName, setId, setQuantity, setLocation]
    );
  },
  

  async updateSet(setIdToUpdate, updatedData) {
    const {
      setName,
      setId,
      setQuantity,
      setLocation,
    } = updatedData;
    return query(
      "UPDATE sets SET set_name = ?, set_id = ?, set_quantity = ?, set_location = ? WHERE id = ?",
      [
        setName,
        setId,
        setQuantity,
        setLocation,
        setIdToUpdate,
      ]
    );
  },
  
  async deleteSet(setId) {
    return query("DELETE FROM sets WHERE id = ?", [setId]);
  },
};
module.exports = SetModel;
