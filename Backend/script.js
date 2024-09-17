const express = require('express');
const connectDB = require('./Configs/dbconnection')
const cookieParser = require('cookie-parser');
const isLoggedIn = require('./Middlewares/CheckIsLoggedIn')
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
app.get('/test', isLoggedIn, (req, res) => {
  res.send('You are logged in!');
});

app.use("/admin" , require('./Routes/AdminRoutes'))
app.use("/employee" , require('./Routes/EmployeRoutes'))
app.use("/" , require('./Routes/ProductRoutes'))




