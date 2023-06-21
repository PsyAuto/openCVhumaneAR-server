// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the user data
const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: false,
    unique: true,
    description: "Unique identifier for the user"
    },
    SelectedMarkerIndex: {
      type: Number,
      required: false,
      description: "Index of the selected marker"
    },
    NeighborKeywords: {
      type: [String],
      required: false,
      description: "Array of keywords associated with the user's neighbors"
    },
    MyKeywords: {
      type: [String],
      required: false,
      description: "Array of keywords associated with the user"
    },
    NewKeywords: {
      type: [String],
      description: "Array of new keywords added by the user"
    },
    CurrentStage: {
      type: Number,
      required: false,
      default: 1,
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
  }
);

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
  },

  /**
   * Finds all users in the database using userID.
   * @returns {Promise} A Promise that resolves to an array of users.
   */
  findByUserID: function(userID) {
    return User.find({ userID: userID });
  },

  /**
   * Finds a user by userID in the database.
   * @param {string} userID - The userID of the user to find.
   * @returns {Promise} A Promise that resolves to the found user.
   */
  findByUserID: function(userID) {
    return User.findOne({ userID: userID });
  },

  /**
   * Updates a user in the database.
   * @param {string} userID - The userID of the user to update.
   * @param {Object} user - The updated user data.
   * @returns {Promise} A Promise that resolves to the updated user.
   */
  updateByUserID: function(userID, user) {
    return User.findOneAndUpdate({ userID: userID }, user);
  },

  /**
   * Deletes a user from the database.
   * @param {string} userID - The userID of the user to delete.
   * @returns {Promise} A Promise that resolves when the user is deleted.
   */
  deleteByUserID: function(userID) {
    return User.findOneAndDelete({ userID: userID });
  },

  /**
   * Sets the selected marker index for a user in the database.
   * @param {string} userID - The ID of the user to update.
   * @param {number} selectedMarkerIndex - The new selected marker index for the user.
   * @returns {Promise} A Promise that resolves to the updated user.
   */
  setSelectedMarkerIndex: async function(userID, selectedMarkerIndex) {
    // Find the user with the given userID
    const user = await User.findOne({ userID: userID });

    // If the user doesn't exist, throw an error
    if (!user) {
      throw new Error(`User with ID ${userID} not found`);
    }

    // Check if the selected marker index is already in use by another user
    const existingUser = await User.findOne({ SelectedMarkerIndex: selectedMarkerIndex });

    // If the selected marker index is already in use, throw an error
    if (existingUser) {
      throw new Error(`Selected marker index ${selectedMarkerIndex} is already in use by user with ID ${existingUser.userID}`);
    }

    // Update the user's selected marker index and save to the database
    user.SelectedMarkerIndex = selectedMarkerIndex;
    await user.save();

    // Return the updated user object
    return user;
  }
};

mongoose.set("strictQuery", false)

// Connect to the MongoDB database using Mongoose
mongoose.connect('mongodb://localhost:27017/humaneAR', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = UserDAO;