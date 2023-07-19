const UserDAO = require('./UserDAO');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    // Handle the 'saveSocketID' event
    socket.on('saveSocketID', async (userID) => {
      try {
        await UserDAO.updateByUserID(userID, { socketID: socket.id });
        console.log(`Socket ID ${socket.id} saved for user ${userID}`);
      } catch (error) {
        console.error(`Error saving socket ID for user ${userID}: ${error}`);
      }
    });

    // Handle the 'createSocketID' event
    socket.on('createSocketID', async (userData) => {
    try {
      const user = await UserDAO.createSocketID(userData, socket.id);
      console.log(`User created with ID ${user.userID} ${user.socketID}`);
      socket.emit('userCreated', user);
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      socket.emit('userCreateError', error.message);
    }
  });

    // Handle the 'getUsers' event
    socket.on('getUsers', async () => {
      try {
        const users = await UserDAO.find();
        socket.emit('users', users);
      } catch (error) {
        console.error(`Error getting users: ${error}`);
      }
    });

    // Handle the 'getUser' event
    socket.on('getUser', async (userID) => {
      try {
        const user = await UserDAO.findByUserID(userID);
        socket.emit('user', user);
      } catch (error) {
        console.error(`Error getting user ${userID}: ${error}`);
      }
    });

    // Handle the 'updateUser' event
    socket.on('updateUser', async (userID, user) => {
      try {
        await UserDAO.updateByUserID(userID, user);
        console.log(`User ${userID} updated: ${JSON.stringify(user)}`);
      } catch (error) {
        console.error(`Error updating user ${userID}: ${error}`);
      }
    });

    // Handle the 'deleteUser' event
    socket.on('deleteUser', async (userID) => {
      try {
        await UserDAO.deleteByUserID(userID);
        console.log(`User ${userID} deleted`);
      } catch (error) {
        console.error(`Error deleting user ${userID}: ${error}`);
      }
    });

    // Handle the 'setSelectedMarkerIndex' event
    socket.on('setSelectedMarkerIndex', async (userID, selectedMarkerIndex) => {
      try {
        const user = await UserDAO.setSelectedMarkerIndex(userID, selectedMarkerIndex);
        console.log(`Selected marker index set to ${selectedMarkerIndex} for user ${userID}`);
        io.emit('userUpdated', user);
      } catch (error) {
        console.error(`Error setting selected marker index for user ${userID}: ${error}`);
      }
    });

    // Handle the 'disconnect' event
    socket.on('disconnect', async () => {
      try {
        const user = await UserDAO.findBySocketID(socket.id);
        if (user) {
          await UserDAO.updateByUserID(user.userID, { socketID: null });
          console.log(`Socket ID ${socket.id} removed from user ${user.userID}`);
        }
      } catch (error) {
        console.error(`Error removing socket ID ${socket.id} from user: ${error}`);
      }
    });
  });
};