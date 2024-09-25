require('dotenv').config();

const {handle_data} = require('./middleware/handle_data');

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.SERVER_PORT;

const corsOption = {
    origin: [`http://localhost:${process.env.CLIENT_PORT}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOption));

app.get('/', (req, res) => {
    const retrievedData = handle_data(
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