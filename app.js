//Created by Piatkohlo Volodymyr



const apiKey = 'ca26636c39292141e6984f7f6b30c846'; 

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amountInput').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultContainer = document.getElementById('resultContainer');
    const resultDiv = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        alert('Будь ласка, введіть коректну суму для конвертації.');
        return;
    }


    resultDiv.textContent = 'Завантаження...';
    resultContainer.classList.remove('hidden', 'success', 'error');
    resultContainer.classList.add('loading');

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Не вдалося отримати дані про курси валют');

        const data = await response.json();

        const exchangeRate = data.conversion_rates[toCurrency];
        if (!exchangeRate) throw new Error('Обрані валюти не підтримуються');

        const convertedAmount = (amount * exchangeRate).toFixed(2);

        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        resultContainer.classList.remove('loading', 'error');
        resultContainer.classList.add('success');
    } catch (error) {
        resultDiv.textContent = `Помилка: ${error.message}`;
        resultContainer.classList.remove('loading', 'success');
        resultContainer.classList.add('error');
    }
}
