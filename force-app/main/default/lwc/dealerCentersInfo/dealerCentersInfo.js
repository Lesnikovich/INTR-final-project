import { LightningElement,wire,track,api } from 'lwc';
import getCenterInfo from '@salesforce/apex/CarCentersController.getCenterInfo';

export default class DealerCentersInfo extends LightningElement {
    @api recordTypeName = 'Dealer Center';
    carCenters; 
    error;
    mapMarkers = [];

    @wire(getCenterInfo, { recordTypeName: '$recordTypeName' })
    wiredCarCenters({ data, error }) {
        if (data) {
            this.carCenters = data.map(center => ({
                ...center,
                address: JSON.parse(center.address)
            }));
            this.carCenters.forEach(center => {
                this.mapMarkers = [...this.mapMarkers ,
                    {
                        location: {
                            Country: center.address.country,
                            City: center.address.city,
                            Street: center.address.street,
                        },
        
                        icon: 'custom:custom31',
                        title: center.name,
                        description: `${center.address.street} <br>
                                        Телефон: ${center.phone} <br> 
                                        Email: ${center.email} <br>
                                        Время работы: ${center.workingHours}
                                        `,
                    }                                    
                ];
              });            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.carCenters = undefined;
        }
    }
}