// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the user data
const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
    description: "Unique identifier for the user"
  },
  SelectedMarkerIndex: {
    type: Number,
    required: true,
    description: "Index of the selected marker"
  },
  NeighborKeywords: {
    type: [String],
    required: true,
    description: "Array of keywords associated with the user's neighbors"
  },
  MyKeywords: {
    type: [String],
    required: true,
    description: "Array of keywords associated with the user"
  },
  NewKeywords: {
    type: [String],
    description: "Array of new keywords added by the user"
  },
  CurrentStage: {
    type: Number,
    required: true,
    description: "Current stage of the user's progress"
  },
  MyArticle: {
    type: String,
    description: "Article associated with the user"
  },
  NeighborArticles: {
    type: [String],
    description: "Array of articles associated with the user's neighbors"
  }
});

// Add indexes for frequently queried fields
UserSchema.index({ userID: 1 });
UserSchema.index({ SelectedMarkerIndex: 1 });

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Create a DAO object
const UserDAO = {
  /**
   * Creates a new user in the database.
   * @param {Object} user - The user data to create.
   * @returns {Promise} A Promise that resolves to the created user.
   */
  create: function(user) {
    return User.create(user);
  },

  /**
   * Finds all users in the database.
   * @returns {Promise} A Promise that resolves to an array of users.
   */
  find: function() {
    return User.find();
  },

  /**
   * Finds a user by ID in the database.
   * @param {string} id - The ID of the user to find.
   * @returns {Promise} A Promise that resolves to the found user.
   */
  findById: function(id) {
    return User.findById(id);
  },

  /**
   * Finds users by name in the database.
   * @param {string} name - The name of the users to find.
   * @returns {Promise} A Promise that resolves to an array of users.
   */
  findByName: function(name) {
    return User.find({name: name});
  },

  /**
   * Updates a user in the database.
   * @param {string} id - The ID of the user to update.
   * @param {Object} user - The updated user data.
   * @returns {Promise} A Promise that resolves to the updated user.
   */
  update: function(id, user) {
    return User.findByIdAndUpdate(id, user);
  },

  /**
   * Deletes a user from the database.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise} A Promise that resolves when the user is deleted.
   */
  delete: function(id) {
    return User.findByIdAndDelete(id);
  }
};

mongoose.set("strictQuery", false)

// Connect to the MongoDB database using Mongoose
mongoose.connect('mongodb://localhost:27017/humaneAR', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = UserDAO;