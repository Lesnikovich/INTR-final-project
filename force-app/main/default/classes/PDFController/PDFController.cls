public without sharing class PDFController {
    public List<ProductWrapper> products { get; private set; }
    public String family { get; private set; }
    public String currencyAbbr { get; private set; }
    public Decimal currencyScale { get; private set; }
    public Decimal currencyRate { get; private set; }
    

    public class ProductWrapper {
        public String name { get; set; }
        public String code {get; set;}
        public Decimal price { get; set; }
        public String currencyName { get; set; }

        ProductWrapper(String name, String code, Decimal price, String currencyName) {
            this.name = name;
            this.code = code;
            this.price = price;
            this.currencyName = currencyName;
        }
    }

    public String clientName { get; private set; }
    public String orderDetails { get; private set; }

    public PDFController() {
        family = ApexPages.currentPage().getParameters().get('family');
        currencyAbbr = ApexPages.currentPage().getParameters().get('currencyAbbr');

        if(currencyAbbr!='BYN'){
        DailyRate__mdt dailyRate = [SELECT Cur_Scale__c, Cur_OfficialRate__c FROM DailyRate__mdt WHERE Cur_Abbreviation__c = :currencyAbbr LIMIT 1];
            currencyScale = dailyRate.Cur_Scale__c;
            currencyRate = dailyRate.Cur_OfficialRate__c;
        }
        List<ProductWrapper> productList = new List<ProductWrapper>();

        Id standardPriceBookId = [SELECT Id 
                                FROM Pricebook2 
                                WHERE IsStandard = true 
                                LIMIT 1].Id;

        for (Product2 product : [
            SELECT Name, ProductCode, Family, 
                (SELECT UnitPrice 
                    FROM PricebookEntries 
                    WHERE Pricebook2Id = :standardPriceBookId AND IsActive = true LIMIT 1)
            FROM Product2
            WHERE Family = :family 
        ]) {
            if (!product.PricebookEntries.isEmpty()) {
                Decimal unitPrice = product.PricebookEntries[0].UnitPrice;
                if(currencyAbbr!='BYN'){
                    unitPrice = (unitPrice * currencyScale / currencyRate).setScale(2, RoundingMode.HALF_UP);
                }
                productList.add(new ProductWrapper(product.Name, product.ProductCode, unitPrice, currencyAbbr));
            }
        }

        products = productList;
    }
}

