const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', 'hbs');

app.listen(5000, ()=>{
    console.log('Listening to port number 5000');
});