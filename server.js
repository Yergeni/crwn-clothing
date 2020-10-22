const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const enforce = require('express-sslify'); // to enforce HTTP calls to use HTTPS

if (process.env.NODE_ENV !== 'production') {
    // load dotenv module in environments other than production
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // give back a function that its first param is the srecret key from stripe account

const app = express();
const port = process.env.PORT || 5000; // When it gets deployed to Heroku, it will set the process PORT 

app.use(bodyParser.json()); // process al the incoming request bodies and covert them to json
app.use(bodyParser.urlencoded({ extended: true })); // encode the url
app.use(enforce.HTTPS({ trustProtoHeader: true })); // trustProtoHeader needed for reverse proxy in Heroku

app.use(cors()); // allow cross-origin request

// Serve all static files
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // any url the user hits responds with the index.html file. This will take care of all routes frontend
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html')) // send our static files (HTML, JS, CSS)
    });
}

// Start listening for request
app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port: ' + port);
});

// Giving the service worker
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

// Post route to payment
app.post('/payment', (req, res) => {
    // a token will come from the frontend on the request
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).send({error: stripeErr});
        } else {
            res.status(200).send({success: stripeRes});
        }
    })
})