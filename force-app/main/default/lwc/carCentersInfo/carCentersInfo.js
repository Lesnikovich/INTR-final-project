import { LightningElement, wire, api } from 'lwc';
import labels from './labels';
import getCenterInfo from '@salesforce/apex/CarCentersController.getCenterInfo';

export default class CarCentersInfo extends LightningElement {
    @api recordTypeName;
    labels = labels;
    carCenters;
    error;
    mapMarkers = [];
    locationTitle;
    markersTitle;
    
    connectedCallback(){
        this.locationTitle = (this.recordTypeName === 'Dealer Center')?this.labels.DealershipLocation:this.labels.ServiceLocation;
        this.markersTitle = (this.recordTypeName === 'Dealer Center')?this.labels.DealershipPreambleTitle:this.labels.ServicePreambleTitle;
    }

    @wire(getCenterInfo, { recordTypeName: '$recordTypeName' })
    wiredCarCenters({ data, error }) {
        if (data) {
            this.carCenters = data.map(center => ({
                ...center,
                address: JSON.parse(center.address)
            }));
            this.mapMarkers = this.carCenters.map(center => ({
                location: {
                    Country: center.address.country,
                    City: center.address.city,
                    Street: center.address.street,
                },
                icon: 'custom:custom31',
                title: center.name,
                description: `
                    ${center.address.street}, ${center.address.city}, ${center.address.country} <br>
                    Серийный номер: ${center.serialNumber} <br>
                    Телефон: ${center.phone} <br> 
                    Email: ${center.email} <br>
                    Время работы: ${center.workingHours}
                `,
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.carCenters = undefined;
        }
    }
}
