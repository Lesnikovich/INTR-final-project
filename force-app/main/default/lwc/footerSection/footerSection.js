import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/footerImages'


export default class FooterSection extends LightningElement {
    vkIcon = Image_Url+'/vk.svg'
    facebookIcon = Image_Url+'/facebook.svg'
    instagramIcon = Image_Url+'/instagram.svg'
    tiktokIcon = Image_Url+'/tikTok.svg'
    logoWhite = Image_Url+'/logoWhite.png'
}