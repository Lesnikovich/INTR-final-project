import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/quickLinksImg'
import labels from './labels';
import {NavigationMixin} from 'lightning/navigation';

export default class QuickLinks extends NavigationMixin(LightningElement) {
    data = [
        {
            id: 1,
            image: Image_Url + '/ModelRange.jpg',
            text: `${labels.ModelRange}`,
        },
        {
            id: 2,
            image: Image_Url + '/DealerCenters.jpg',
            text: `${labels.DealerCenters}`,
        },
        {
            id: 3,
            image: Image_Url + '/ServiceCenters.jpg',
            text: `${labels.ServiceCenters}`,
        },
        {
            id: 4,
            image: Image_Url + '/TestDrive.jpg',
            text: `${labels.ServiceCenters}`,
        },
    ];

    handleClick(event){
        let selectedCard = Number(event.currentTarget.dataset.id);

        switch (selectedCard) {
            case 1:
                this.navigateToPages('models__c');
            break;
            case 2:
                this.navigateToPages('centers__c');
            break;
            case 3:
                this.navigateToPages('ServiceCenters__c');
            break;
            case 4:
                this.navigateToPages('testdrive__c');
            break;
            default:
                console.error("Error navigating to the page from Quick Links.");
          }
    }

    navigateToPages(pageApiName){
        console.log('pageApiName in navigation function:'+JSON.stringify(pageApiName))
        this[NavigationMixin.Navigate]({
            type:'comm__namedPage',
            attributes:{
                name:pageApiName
            }
        })
    }
}