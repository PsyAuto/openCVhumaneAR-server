const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/humaneAR', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for your data
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Create a DAO object
const UserDAO = {
  create: function(user) {
    return User.create(user);
  },
  find: function() {
    return User.find();
  },
  findById: function(id) {
    return User.findById(id);
  },
  findByName: function(name) {
    return User.find({name: name});
  },
  update: function(id, user) {
    return User.findByIdAndUpdate(id, user);
  },
  delete: function(id) {
    return User.findByIdAndDelete(id);
  }
};


module.exports = UserDAO;