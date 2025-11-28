const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js')
const employeeRoutes = require('./routes/employeeRoutes.js')

const DB_URL = "mongodb+srv://nguyensteven578_db_user:Breaksword@clustercomp3123.qnimjux.mongodb.net/?appName=ClusterComp3123";
const PORT = 8081;
//mongodb+srv://nguyensteven578_db_user:WWeB6p1G9Ao8dLFK@clustercomp3123.qnimjux.mongodb.net/?retryWrites=true&w=majority&appName=ClusterComp3123
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("<h1>Steven Nguyen 101122624 COMP3123 Assigment 2 Backend</h1>");
});

app.use('/api/v1', userRoutes);
app.use('/api/v1', employeeRoutes)

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
    app.listen(PORT, () => {
    console.log("Server is listening on port 8081");
});
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
