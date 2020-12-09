const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const employeesRouter = require('./routes/employees');
const labEmployeesRouter = require('./routes/labEmployees');
const employeeTestsRouter = require('./routes/employeeTests');
const poolMapsRouter = require('./routes/poolMaps');

app.use('/employees', employeesRouter);
app.use('/labEmployees', labEmployeesRouter);
app.use('/employeeTests', employeeTestsRouter);
app.use('/poolMaps', poolMapsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});