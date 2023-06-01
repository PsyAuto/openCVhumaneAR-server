const express = require('express');
const app = express();
const userRouter = require('./routes/users');

app.use(express.json());
app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});