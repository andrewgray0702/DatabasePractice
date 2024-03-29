const express = require('express');
const app = express();
const PORT = 3000;
const userRoutes = require('./routes/users.routes')
const bodyParser = require('body-parser')


app.use(bodyParser.json());

app.use(express.static(__dirname+"/dist"));

app.use('/users', userRoutes);


app.get('/', (req,res) =>{

})

app.get('/*', (req, res) => {
    res.redirect('back')
})

app.listen(PORT); 