const express = require('express');
const { engine } = require('express-handlebars');
const fileupload = require('express-fileupload');

const app = express();

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(fileupload());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/store', (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded')
    }

    sampleFile = req.files.sampleFile;
    console.log(sampleFile);
});


app.listen(5000, () => {
    console.log('Listening to port number 5000');
});