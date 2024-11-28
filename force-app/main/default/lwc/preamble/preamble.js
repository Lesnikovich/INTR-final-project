import { LightningElement, api } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/preambleImages'
import HomePreambleTitle from '@salesforce/label/c.HomePreambleTitle'
import HomePreambleText from '@salesforce/label/c.HomePreambleText'
import DealershipPreambleTitle from '@salesforce/label/c.DealershipPreambleTitle'
import DealershipPreambleText from '@salesforce/label/c.DealershipPreambleText'
import ServicePreambleTitle from '@salesforce/label/c.ServicePreambleTitle'
import ServicePreambleText from '@salesforce/label/c.ServicePreambleText'
import TDrivePreambleTitle from '@salesforce/label/c.TDrivePreambleTitle'
import TDrivePreambleText from '@salesforce/label/c.TDrivePreambleText'

export default class Preamble extends LightningElement {
    @api pageTypeName;
    label = {}
    preambleImage;
 
    connectedCallback(){
        switch (this.pageTypeName) {
            case 'Home':
                this.label = {
                    preambleTitle: HomePreambleTitle,
                    preambleText: HomePreambleText
                }
                this.preambleImage = Image_Url + '/LadaVestaSedan.png';
                break;
            case 'Dealer Centers':
                this.label = {
                    preambleTitle: DealershipPreambleTitle,
                    preambleText: DealershipPreambleText
                }
                this.preambleImage = Image_Url + '/DealerCenters.jpg';
                break;
            case 'Service Centers':
                this.label = {
                    preambleTitle: ServicePreambleTitle,
                    preambleText: ServicePreambleText
                }
                this.preambleImage = Image_Url + '/ServiceCenters.jpg';
                break;
            case 'Test Drive':
                this.label = {
                    preambleTitle: TDrivePreambleTitle,
                    preambleText: TDrivePreambleText
                }
                this.preambleImage = Image_Url + '/TestDrive.jpg';
                break;
        
            default:
                console.error("Some problems");
                break;
        }
    }
    
}