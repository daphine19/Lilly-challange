const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const displayAll = document.getElementById('display');
hideSpinner();

fetch('http://localhost:3000/stocks')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let symbols = data.stockSymbols;
        symbols.forEach((symbol) => {
            const stockname =
                '<h3>' +
                symbol +
                '</h3>' +
                '<button onclick="handleClick(event)" id="' +
                symbol +
                '">More Info</button> <p class="' +
                symbol +
                '-p"></p>' +
                '<hr></hr>';

            displayAll.insertAdjacentHTML('beforeend', stockname);
        });
    });

function getStockData(symbol) {
    const url = 'http://localhost:3000/stocks/' + symbol;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);

            const stockInfo = data;

            let text = '';

            stockInfo.forEach((obj) => {
                let date = new Date(obj.timestamp * 1000);
                text +=
                    '<p>' + date + ':<br />' + 'Price: $' + obj.value + '</p>';
            });
            document.getElementsByClassName('' + symbol + '-p')[0].innerHTML =
                text;
        })
        .catch((err) => {
            //console.log(err);
            // Uncomment this line to retry after error occurs
            // getStockData(symbol);
            const errorMsg =
                '<h3 class="error"> Failed to get data for ' + symbol + '</h3>';
            document.getElementsByClassName('' + symbol + '-p')[0].innerHTML =
                errorMsg;
        });
}

//functions to handle the spinner work
function handleClick(event) {
    showSpinner();
    //console.log('Button Clicked: ', event.target.id);
    setTimeout(() => {
        getStockData(event.target.id);
        hideSpinner();
    }, 2000);
}

function hideSpinner() {
    let spinner = document.getElementsByClassName('spinner');
    spinner[0].style.display = 'none';
}

function showSpinner() {
    let spinner = document.getElementsByClassName('spinner');
    spinner[0].style.display = 'inline-block';
}

//functions for the graph 
function drawLine(start, end, style) {
    ctx.beginPath();
    ctx.strokeStyle = style || 'black';
    ctx.moveTo(...start);
    ctx.lineTo(...end);
    ctx.stroke();
}

function drawTriangle(apex1, apex2, apex3) {
    ctx.beginPath();
    ctx.moveTo(...apex1);
    ctx.lineTo(...apex2);
    ctx.lineTo(...apex3);
    ctx.fill();
}

drawLine([50, 50], [50, 550]);
drawTriangle([35, 50], [65, 50], [50, 35]);

drawLine([50, 550], [950, 550]);
drawTriangle([950, 535], [950, 565], [965, 550]);

