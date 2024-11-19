import { LightningElement } from 'lwc';

export default class CurrencySelector extends LightningElement {
    currencyOptions = [
        { label: 'USD - Доллар США', value: 'USD' },
        { label: 'EUR - Евро', value: 'EUR' },
        { label: 'RUB - Российский рубль', value: 'RUB' },
        { label: 'JPY - Японская иена', value: 'JPY' },
        { label: 'GBP - Британский фунт', value: 'GBP' }
    ];

    selectedCurrency = '';

    connectedCallback() {
        const savedCurrency = sessionStorage.getItem('selectedCurrency');
        if (savedCurrency) {
            this.selectedCurrency = savedCurrency;
        }
    }

    handleCurrencyChange(event) {
        this.selectedCurrency = event.target.value;
        sessionStorage.setItem('selectedCurrency', this.selectedCurrency);
    }
}