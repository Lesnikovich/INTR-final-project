@isTest
private class ProductControllerTest {

    @isTest
    static void testGetProductFamilies() {
        List<Product2> products = new List<Product2>();
        
        products.add(new Product2(Name='Product 1', Family='Family A'));
        products.add(new Product2(Name='Product 2', Family='Family B'));
        products.add(new Product2(Name='Product 3', Family='Family A'));
        products.add(new Product2(Name='Product 4', Family='Family C'));
        insert products;
        
        Test.startTest();
        List<String> families = ProductController.getProductFamilies();
        Test.stopTest();
        
        Assert.areEqual(3, families.size(), 'Количество семей должно быть 3');
        Assert.isTrue(families.contains('Family A'), 'Семья Family A должна быть в списке');
        Assert.isTrue(families.contains('Family B'), 'Семья Family B должна быть в списке');
        Assert.isTrue(families.contains('Family C'), 'Семья Family C должна быть в списке');
    }
}
