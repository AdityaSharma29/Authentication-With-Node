const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/update_users_data', (req, res) => {
    fs.readFile('./assets/users/data.json', (err, data) => {
        if(err) throw err;
        let count = 1001;
        let response_data = JSON.parse(data);
        response_data.forEach(element => {
            element.id = count;
            count++;
        });
        let json_data = JSON.stringify(response_data, null, 2);
        fs.writeFile('./assets/users/data.json', json_data, 'utf8', (err) => {
            if(err) throw err;
            console.log("data updated successfully.");
        })
    })
    res.redirect('/display_users');
})

app.get('/display_users', (req, res) => {
    res.render('api');
});

app.listen(3060, () => {
    console.log("admin server running.");
});