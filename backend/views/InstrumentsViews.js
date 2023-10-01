const InstrumentController = require("../controllers/InstrumentController");
const isAuthenticated = require("../isAuthenticated");

const singleInstrumentsApi = (app) => {
  app.get("/singleInstruments/:id", isAuthenticated, InstrumentController.getAllInstruments); 
  app.put("/singleInstruments/:id", isAuthenticated, InstrumentController.updateInstrument);
  app.delete("/singleInstruments/:id", isAuthenticated, InstrumentController.deleteInstrument);
};

module.exports = singleInstrumentsApi;

