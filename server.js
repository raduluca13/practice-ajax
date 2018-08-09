const PORT = 8080;

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let db = require('./server/db');

let app = express();
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log('\x1b[32m', `Listening on ${PORT}`);
});

app.use('/dist', express.static(path.join(__dirname, '/dist')));



/** APIs */
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get('/pets', (req, res) => {
    if (req.query.name) {
        db.getPetsByName(req.query.name).then(
            resp => res.json(resp)
        );
        return;
    };
    db.getAllPets().then(resp => res.json(resp));
});

app.get('/pets/:id', (req, res) => {
    db.getPet(Number(req.params.id)).then(
        resp => res.json(resp),
        err => res.status(err).send()
    );
});

app.post('/pets', (req, res) => {
    db.addPet(req.body).then(
        resp => res.json(resp)
    )
});

app.put('/pets/:id', (req, res) => {
    db.replacePet(Number(req.params.id), req.body).then(
        resp => res.json(resp)
    );
});

app.delete('/pets/:id', (req, res) => {
    db.deletePet(Number(req.params.id)).then(
        resp => res.status(200).send()
    ).catch(err => res.status(err).send())
});