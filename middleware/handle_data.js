const jsonData = require("../data/data.json");
const fs = require("fs");

exports.getFilteredInvoices = (
    invoiceNumber,
    invoiceSender,
    invoiceReceiver,
    startDatePeriod,
    endDatePeriod
) => {
    try {
        let filteredInvoices = [];
        for (const [key, value] of Object.entries(jsonData)) {
            if (startDatePeriod <= value['Дата выдачи'] && value['Дата выдачи'] <= endDatePeriod || invoiceNumber === key) {
                value['Номер'] = key;
                filteredInvoices.push(value);
            }
        }
        return filteredInvoices;
    } catch (error) {
        console.error(error.message);
    }

};

exports.createNewInvoice = (invoiceData) => {
    try {
        const invoicesList = JSON.parse(fs.readFileSync('data/data.json', 'utf8'))

        invoicesList[`${invoiceData.invoiceNumberElem}`] = {
            "Отправитель": {
                "Цех": `'${invoiceData.invoiceSenderElem}'`,
                "участок Цеха": ""
            },
            "Получатель": {
                "Цех": `'${invoiceData.invoiceReceiverElem}'`,
                "участок Цеха": ""
            },
            "Дата выдачи": `'${invoiceData.invoiceDateElem}'`,
            "Выдано": {}
        }

        const data = JSON.stringify(invoicesList, null, 2)

        try {
            fs.writeFileSync('data/data.json', data)
        } catch (e) {
            console.log(e)
            return false
        }
    }
    catch (e) {
        console.log(e)
        return false
    }

    return true
};