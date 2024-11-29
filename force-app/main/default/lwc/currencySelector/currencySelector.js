import { LightningElement } from 'lwc';
import labels from './labels';

export default class CurrencySelector extends LightningElement {
    labels = labels;
    currencyOptions = [
        { label: `${this.labels.BYN}`, value: 'BYN' },
        { label: `${this.labels.RUB}`, value: 'RUB' },
        { label: `${this.labels.USD}`, value: 'USD' },
        { label: `${this.labels.EUR}`, value: 'EUR' },
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