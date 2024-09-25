const jsonData = require("../data/data.json");

exports.handle_data = (
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
                filteredInvoices.push(value);
            }
        }
        return filteredInvoices;
    } catch (error) {
        console.error(error.message);
    }

}