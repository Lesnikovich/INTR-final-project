import { LightningElement,wire,track,api } from 'lwc';
import getCompanyLocations from '@salesforce/apex/CarCentersController.getCompanyLocations';

export default class DealerCentersInfo extends LightningElement {
    @api accountNameParam='United';    
    @track error; 
    @track mapMarkers = [];
    @track markersTitle = 'Aitechone Technologies';
    @track zoomLevel = 4;

    @wire(getCompanyLocations, { accountNameInitial: '$accountNameParam'})
    wiredOfficeLocations({ error, data }) {
        if (data) {            
            data.forEach(dataItem => {
                this.mapMarkers = [...this.mapMarkers ,
                    {
                        location: {
                            City: dataItem.BillingCity,
                            Country: dataItem.BillingCountry,
                        },
        
                        icon: 'custom:custom26',
                        title: dataItem.Name,
                    }                                    
                ];
              });            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}