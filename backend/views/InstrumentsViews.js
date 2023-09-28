const InstrumentController = require("../controllers/InstrumentController");
const isAuthenticated = require("../isAuthenticated");

const singleInstrumentsApi = (app) => {
  app.get("/singleInstruments/", isAuthenticated, InstrumentController.getAllInstruments); // and Add 'Id" at the end of  app.get("/singleInstruments/:id",...
  app.post("/singleInstruments", isAuthenticated, InstrumentController.addInstrument);
  app.put("/singleInstruments/:id", isAuthenticated, InstrumentController.updateInstrument);
  app.delete("/singleInstruments/:id", isAuthenticated, InstrumentController.deleteInstrument);
};

module.exports = singleInstrumentsApi;

