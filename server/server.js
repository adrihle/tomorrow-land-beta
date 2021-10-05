const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log('====================================');
    console.log('server running correctly on port: ' + app.get('port'));
    console.log('====================================');
})

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/login', async (req, res) => {
    const loginCredentials = {
        username: 'ufounders',
        password: 'react'
    }
    if (req.body.username !== loginCredentials.username || req.body.password !== loginCredentials.password){
        res.status(401).send({
            error: 'Invalid Credentials',
            auth: false
        })
    }
    else {
        res.status(200).send({
            name: 'Antonio',
            surname: 'Resines',
            birthday: new Date('1975-10-03T08:55:38.286Z'),
            auth: true
        });
    }
});

app.get('/tickets', async (req, res) => {
    const url = 'https://6f7smj4fdc.execute-api.us-east-1.amazonaws.com/default/techJobMission'
    await axios.get(url)
    .then(response => {
        res.send(response.data);
    })
})

