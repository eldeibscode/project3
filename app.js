const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')


const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) =>{
    console.log("undefined router is visited!");
    res.status(404).send("<h1> Page not found</h1>");
});


// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);