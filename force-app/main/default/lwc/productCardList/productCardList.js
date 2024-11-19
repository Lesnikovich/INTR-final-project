import { LightningElement, wire, track } from 'lwc';
import getProductFamilies from '@salesforce/apex/ProductController.getProductFamilies';
import Image_Url from '@salesforce/resourceUrl/carImages'

export default class ProductCardList extends LightningElement {
    productFamilies = [];
    isModalOpen = false;
    selectedProduct = {};

    @wire(getProductFamilies)
    wiredProducts({ data, error }) {
        if (data && Array.isArray(data)) {
            this.productFamilies = data.map(family => ({
                name: family,
                image: Image_Url + `/${family.replace(/\s+/g, '')}.png`,
                description: family
            }));
        } else if (error) {
            console.error('Error fetching product families:', error);
        }
    }

    handleCardClick(event) {
        const name = event.currentTarget.dataset.name;
        const product = this.productFamilies.find(p => p.name === name);
        if (product) {
            this.selectedProduct = product;
            this.isModalOpen = true;
        } else {
            console.error('Product not found for name:', name);
            this.isModalOpen = false;
        }
    }
    

    closeModal() {
        this.isModalOpen = false;
    }
    
    generatePDF() {
        try {
            if (this.selectedProduct && this.selectedProduct.name) {
                window.open(`/apex/GeneratePDFPage?productName=${this.selectedProduct.name}`);
            } else {
                console.error('No product selected for PDF generation');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }
}