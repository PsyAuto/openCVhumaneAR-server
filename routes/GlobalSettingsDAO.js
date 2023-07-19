// Import the Mongoose library
const mongoose = require('mongoose');
const socketio = require('socket.io');

// Define a schema for the global system settings
const GlobalSettingsSchema = new mongoose.Schema({
  CurrentStage: {
    type: Number,
    required: true,
    default: 1,
    description: "Current stage of the scenario"
  },
  Radius: {
    type: Number,
    required: true,
    default: 3,
    description: "Interaction Radius"
  }
});

// Create a model from the schema
const GlobalSettings = mongoose.model('GlobalSettings', GlobalSettingsSchema);

// Create a DAO object
const GlobalSettingsDAO = {
  /**
   * Gets the global system settings from the database.
   * @returns {Promise} A Promise that resolves to the global system settings.
   */
  get: function() {
    return GlobalSettings.findOne();
  },

  /**
   * Updates the global system settings in the database.
   * @param {Object} settings - The updated global system settings.
   * @returns {Promise} A Promise that resolves to the updated global system settings.
   */
  update: function(settings) {
    return GlobalSettings.findOneAndUpdate({}, { CurrentStage: settings.CurrentStage, Radius: settings.Radius }, { upsert: true, new: true });
  },

  /**
   * Initializes the global system settings in the database.
   * @returns {Promise} A Promise that resolves to the initialized global system settings.
   * @description This function should be called when the server starts up.
   * It checks if the global system settings exist in the database.
   * If not, it creates the global system settings.
  */
  initialize: async function() {
    const settings = await GlobalSettings.findOne({});
    if (!settings) {
      await GlobalSettings.create({ CurrentStage: 1});
      await GlobalSettings.findOneAndUpdate({}, { Radius: 3.0 });
    }
  }
};

// Connect to the MongoDB database using Mongoose
mongoose.connect('mongodb://localhost:27017/humaneAR', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    // Initialize the global system settings
    return GlobalSettingsDAO.initialize();
  })
  .catch(error => console.error(error));
;

module.exports = GlobalSettingsDAO;