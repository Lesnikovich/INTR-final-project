import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/carImages'

export default class QuickLinks extends LightningElement {
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
    ]
}