import { LightningElement } from 'lwc';

export default class CurrencySelector extends LightningElement {
    currencyOptions = [
        { label: 'BYN - Белорусский рубль', value: 'BYN' },
        { label: 'RUB - Российский рубль', value: 'RUB' },
        { label: 'USD - Доллар США', value: 'USD' },
        { label: 'EUR - Евро', value: 'EUR' },
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