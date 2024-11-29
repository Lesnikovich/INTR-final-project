@isTest
public class CarCentersControllerTest {
    @isTest
    static void testGetCenterInfo() {
        CarCenter__c testCenter1 = new CarCenter__c(
            Name = 'Test Center 1',
            Phone__c = '123456789',
            Email__c = 'test1@example.com',
            Working_hours__c = '9:00-18:00',
            RecordTypeId = '012Qy000003zGMHIA2'
        );
        CarCenter__c testCenter2 = new CarCenter__c(
            Name = 'Test Center 2',
            Phone__c = '987654321',
            Email__c = 'test2@example.com',
            Working_hours__c = '10:00-19:00',
            RecordTypeId = '012Qy000003zGMHIA2'
        );
        insert new List<CarCenter__c>{ testCenter1, testCenter2 };

        Test.startTest();
        List<CarCentersController.CarCenter> result = CarCentersController.getCenterInfo('Dealer Center');
        Test.stopTest();

        Assert.areEqual(2, result.size(), 'Two records must be returned');
        Assert.areEqual('Test Center 1', result[0].name, 'The name of the first center must be right');
    }
    
    @isTest
    static void testGetCenterInfoEmptyResult() {
        Test.startTest();
        List<CarCentersController.CarCenter> result = CarCentersController.getCenterInfo('NonExistentRecordType');
        Test.stopTest();

        Assert.areEqual(0, result.size(), 'The list must be empty for a wrong RecordType');
    }
}
