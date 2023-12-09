const express = require('express');
const { engine } = require('express-handlebars');
const fileupload = require('express-fileupload');
const mysql = require('mysql');

const app = express();

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(fileupload());

app.use(express.static('public'));
app.use(express.static('upload'));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'userprofile'
});

pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('Connected');
})


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/store', (req, res) => {
    let sampleFile;
    let uploadPath;
    let date = new Date();

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were found')
    }

    sampleFile = req.files.sampleFile;

    let newFileName = "img_" +
        date.getDate() +
        (date.getMonth() + 1) +
        date.getFullYear() +
        date.getHours() +
        date.getMinutes() +
        date.getSeconds() +
        date.getMilliseconds() +
        ".jpg";
    uploadPath = __dirname + '/upload/' + newFileName;

    sampleFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);

        res.send("File uploaded successfully");
    })
});



app.listen(5000, () => {
    console.log('Listening to port number 5000');
});