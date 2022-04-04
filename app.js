const express = require('express');
const path = require('path');
const stocks = require('./stocks');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

//this is to help us get all the stocks to the front end
//the structure for fetching data is app.METHOD(PATH,HANDLERs)
app.get('/stocks', async (req, res) => {
    const stockSymbols = await stocks.getStocks();
    res.send({ stockSymbols });
});

//this is to help us get details of a stock to the front end
app.get('/stocks/:symbol', async (req, res) => {
    const {
        params: { symbol },
    } = req;

    let data;
    try {
        data = await stocks.getStockPoints(symbol, new Date());
    } catch {
        data = 'Error';
    }

    res.send(data);
});

//this is to check that our server is working on the web browser
app.listen(3000, () => console.log('Server is running!'));
