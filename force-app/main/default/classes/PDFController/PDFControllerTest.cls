@isTest
public class PDFControllerTest {
    @testSetup
    static void setup() {
        Product2 product1 = new Product2(Name = 'Product A', Family = 'Lada Granta Liftback', ProductCode = 'P001', IsActive = true);
        Product2 product2 = new Product2(Name = 'Product B', Family = 'Lada Granta Liftback', ProductCode = 'P002', IsActive = true);
        insert new List<Product2>{ product1, product2 };

        PricebookEntry pbe1 = new PricebookEntry(Product2Id = product1.Id, UnitPrice = 100, Pricebook2Id = Test.getStandardPricebookId(), IsActive = true, UseStandardPrice = false);
        PricebookEntry pbe2 = new PricebookEntry(Product2Id = product2.Id, UnitPrice = 200, Pricebook2Id = Test.getStandardPricebookId(), IsActive = true, UseStandardPrice = false);
        insert new List<PricebookEntry>{ pbe1, pbe2 };
    }

    // @isTest
    // static void testPDFControllerWithBYN() {
    //     Test.startTest();

    //     PageReference pageRef = Page.PriceBook;
    //     pageRef.getParameters().put('family', 'Lada Granta Liftback');
    //     pageRef.getParameters().put('currencyAbbr', 'BYN');
    //     Test.setCurrentPage(pageRef);

    //     PDFController controller = new PDFController();

    //     Assert.areEqual(2, controller.products.size(), 'Must be 2');
    //     Assert.areEqual('Product A', controller.products[0].name);
    //     Assert.areEqual(100.00, controller.products[0].price);
    //     Assert.areEqual('BYN', controller.products[0].currencyName);

    //     Test.stopTest();
    // }
}
