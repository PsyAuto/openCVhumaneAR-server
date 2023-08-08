const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const userRouter = require('./routes/users');
const GlobalSettingsRouter = require('./routes/GlobalSettings');
const userSocketRouter = require('./routes/usersSocketRouter');
const UserDAO = require('./routes/UserDAO');
const GlobalSettingsDAO = require('./routes/GlobalSettingsDAO');
const SocketNamespace = io.of('/socketio/');

app.use(express.json());
app.use('/users', userRouter);
app.use('/GlobalSettings', GlobalSettingsRouter);

app.get('/', (req, res) => {
  res.send('welcome to HumaneAR server!');
});

// socket.io namespace events
//SocketNamespace.on('connection', handleSocketEvents);
SocketNamespace.on('connection', (socket) => {
  console.log(`a user connected to socketio with ID: ${socket.id}`);

  // create socket emit event to create user
  socket.on('createUser', async (userData) => {
    try {
      const user = await UserDAO.createSocketID(userData, socket.id);
      console.log(`User created with ID ${user.userID} ${user.socketID}`);
      socket.emit('userCreated', user);
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      socket.emit('userCreateError', error.message);
    }
  });

  // create socket emit event to get users
  socket.on('getUsers', async () => {
    try {
      const users = await UserDAO.find();
      socket.emit('users', users);
    } catch (error) {
      console.error(`Error getting users: ${error}`);
    }
  });

  // create socket emit event to send CurrentStage
  socket.on('getCurrentStage', async () => {
    try {
      const settings = await GlobalSettingsDAO.get();
      socket.emit('currentStage', settings.CurrentStage);
    } catch (error) {
      console.error(`Error getting currentStage: ${error}`);
    }
  });

  // create socket emit event to send Radius
  socket.on('getRadius', async () => {
    try {
      const settings = await GlobalSettingsDAO.get();
      socket.emit('radius', settings.Radius);
    } catch (error) {
      console.error(`Error getting radius: ${error}`);
    }
  });

  // create socket emit event to send userID
  socket.on('getUserID', async (userID) => {
    try {
      const user = await UserDAO.findByUserID(userID);
      socket.emit('userID', user.userID);
    } catch (error) {
      console.error(`Error getting userID: ${error}`);
    }
  });

  // create socket emit to send a list of the userID of all users
  socket.on('getUserIDs', async () => {
    try {
      const users = await UserDAO.find();
      socket.emit('userIDs', users.map(user => user.userID));
    } catch (error) {
      console.error(`Error getting userIDs: ${error}`);
    }
  });

  // create socket emit event to send a user by userID
  socket.on('getUserByID', async (userID) => {
    try {
      const user = await UserDAO.findByUserID(userID);
      socket.emit('userByID', user);
    } catch (error) {
      console.error(`Error getting userByUserID: ${error}`);
    }
  });

    // create socket emit event to update user by userID
    socket.on('updateUserByID', async (userID, userData) => {
      try {
        const user = await UserDAO.updateByUserID(userID, userData);
        socket.emit('userUpdated', user);
        console.log(`User updated with ID ${user.userID}`);
      } catch (error) {
        console.error(`Error updating user: ${error}`);
      }
    });
});

// http server api
httpServer.listen(4000, () => {
  const address = httpServer.address();
  console.log(`Server started on ${address.address}:${address.port}`);
});

function handleSocketEvents(socket) {
  console.log(`a user connected to socketio with ID: ${socket.id}`);

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

  socket.emit('getUsers', async () => {
    try {
      const users = await UserDAO.find();
      socket.emit('users', users);
    } catch (error) {
      console.error(`Error getting users: ${error}`);
    }
  }); 
}