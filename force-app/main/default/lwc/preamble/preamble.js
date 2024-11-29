import { LightningElement, api } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/preambleImages'
import labels from './labels';

export default class Preamble extends LightningElement {
    @api pageTypeName;
    labels = labels;
    label = {}
    preambleImage;
 
    connectedCallback(){
        switch (this.pageTypeName) {
            case 'Home':
                this.label = {
                    preambleTitle: this.labels.HomePreambleTitle,
                    preambleText: this.labels.HomePreambleText
                }
                this.preambleImage = Image_Url + '/LadaVestaSedan.png';
                break;
            case 'Dealer Centers':
                this.label = {
                    preambleTitle: this.labels.DealershipPreambleTitle,
                    preambleText: this.labels.DealershipPreambleText
                }
                this.preambleImage = Image_Url + '/DealerCenters.jpg';
                break;
            case 'Service Centers':
                this.label = {
                    preambleTitle: this.labels.ServicePreambleTitle,
                    preambleText: this.labels.ServicePreambleText
                }
                this.preambleImage = Image_Url + '/ServiceCenters.jpg';
                break;
            case 'Test Drive':
                this.label = {
                    preambleTitle: this.labels.TDrivePreambleTitle,
                    preambleText: this.labels.TDrivePreambleText
                }
                this.preambleImage = Image_Url + '/TestDrive.jpg';
                break;
        
            default:
                console.error("Some problems");
                break;
        }
    }
    
}