const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config')

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth'

        //Connecting database
        this.initializeDB();

        // Middlewares
        this.middlewares();
        // Routes 
        this.routes();
    }

    async initializeDB () {
        await dbConnection();
    }

    middlewares () {
        // CORS
        this.app.use(cors())
        // Parseo y lectura del body
        this.app.use(express.json());
        // Public directory
        this.app.use(express.static('public'));
    }

    routes () {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use('*', (req, res) => {
            res.send('404 | page not found')
        });
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log('Server runs at the port', this.port);
        })
    }

}

module.exports = Server;