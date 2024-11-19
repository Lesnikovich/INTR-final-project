import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/carImages'
import {NavigationMixin} from 'lightning/navigation';

export default class QuickLinks extends NavigationMixin(LightningElement) {
    data = [
        {
            id: 1,
            image: Image_Url + '/LadaVestaSedan.png',
            text: 'Модельный ряд',
        },
        {
            id: 2,
            image: Image_Url + '/LadaVestaSedan.png',
            text: 'Модельный ряд',
        },
        {
            id: 3,
            image: Image_Url + '/LadaVestaSedan.png',
            text: 'Модельный ряд',
        },
        {
            id: 4,
            image: Image_Url + '/LadaVestaSedan.png',
            text: 'Модельный ряд',
        },
    ];

    handleClick(event){
        let selectedCard = Number(event.currentTarget.dataset.id);
        console.log('selectedCard:'+JSON.stringify(selectedCard));

        switch (selectedCard) {
            case 1:
                this.navigateToPages('models__c');
            break;
            case 2:
                this.navigateToPages('centers__c');
            break;
            case 3:
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