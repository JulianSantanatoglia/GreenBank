document.getElementById('currency-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amountt = document.getElementById('amountt').value;

    const apiKey = '0063252511ab9048ef2db548'; // Reemplaza con tu API Key de ExchangeRate-API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amountt * rate).toFixed(2);

        document.getElementById('resultt').innerText = ` ${amountt} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('resultt').innerText = 'Error al obtener los datos. Por favor, intenta de nuevo.';
    }
});