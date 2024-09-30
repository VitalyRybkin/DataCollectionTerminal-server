require('dotenv').config();

const {getFilteredInvoices, createNewInvoice} = require('./middleware/handle_data');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const express = require('express');
const app = express();
const cors = require('cors');
const {readFileSync} = require("node:fs");

const port = process.env.SERVER_PORT;

const corsOption = {
    origin: [`http://localhost:${process.env.CLIENT_PORT}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOption));

app.post('/new-invoice', jsonParser, (req, res) => {
    if (!req.body) return res.send({
        message: 'ERROR: No data have been received.',
    });

    const result = createNewInvoice(req.body);

    res.send({
        message: result === true ? 'SUCCESS' : 'ERROR',
    });
});

app.get('/', (req, res) => {
    const retrievedData = getFilteredInvoices(
        req.query.invoiceNumber,
        req.query.invoiceSender,
        req.query.invoiceReceiver,
        req.query.startDatePeriod,
        req.query.endDatePeriod
    );
    return res.send(retrievedData);
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})