const PORT = 8080;
let token = null;

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let db = require('./server/db');

let app = express();
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log('\x1b[32m', `Listening on ${PORT}`);
});

app.use('/public', express.static(path.join(__dirname, '/public')));



/** APIs */
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get('/pets', (req, res) => {
    if (!isAuth(req, res)) {
        return;
    }
    if (req.query.name) {
        db.getPetsByName(req.query.name).then(
            resp => res.json(resp)
        );
        return;
    };
    db.getAllPets().then(resp => res.json(resp));
});

app.get('/pets/:id', (req, res) => {
    if (!isAuth(req, res)) {
        return;
    }
    db.getPet(Number(req.params.id)).then(
        resp => res.json(resp),
        err => res.status(err).send()
    );
});

app.post('/pets', (req, res) => {
    if (!isAuth(req, res)) {
        return;
    }
    db.addPet(req.body).then(
        resp => res.json(resp)
    )
});

app.put('/pets/:id', (req, res) => {
    if (!isAuth(req, res)) {
        return;
    }
    db.replacePet(Number(req.params.id), req.body).then(
        resp => res.json(resp)
    );
});

app.delete('/pets/:id', (req, res) => {
    if (!isAuth(req, res)) {
        return;
    }
    db.deletePet(Number(req.params.id)).then(
        resp => res.status(200).send()
    ).catch(err => res.status(err).send())
});

app.post('/login', (req, res) => {
    token = Buffer.from(Date.now().toString()).toString('base64');
    res.header("token", token).status(200).send();
})

function isAuth(req, res) {
    return true;

    // if (req.header("token") !== token ) {
    //     res.status(401).send();
    //     return false;
    // }
    // return true;
}