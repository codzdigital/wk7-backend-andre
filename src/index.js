const express = require('express'); 
const routes= require('./routes')
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');


const app = express();
app.options("*",cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.json())


mongoose.connect('mongodb+srv://semana:semana@cluster0.pmxot.mongodb.net/semana?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true    
});

app.use((req, res, next) => {
    req.io = io;

    next();
})


app.use('/files', express.static(path.resolve(__dirname,'..','uploads','resized')));


app.use(routes);


server.listen(3333);