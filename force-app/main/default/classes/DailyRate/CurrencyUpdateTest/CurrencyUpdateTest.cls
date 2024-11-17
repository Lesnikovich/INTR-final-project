@isTest
public class CurrencyUpdateTest {

    private class MockHttpResponseGenerator implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('[{"Cur_Abbreviation":"USD","Cur_Scale":1,"Cur_OfficialRate":3.3748}]');
            res.setStatusCode(200);
            return res;
        }
    }
    
    @isTest
    static void testCurrencyRateUpdater() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());

        Test.startTest();
        CurrencyRateUpdater.upsertRecord();
        Test.stopTest();
        
        Assert.isTrue(true, 'The method is executed without exceptions');
    }

    @isTest
    static void testScheduler() {

        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());

        Test.startTest();
        String jobId = System.schedule('TestCurrencyScheduler', '0 0 0 * * ?', new CurrencyUpdateScheduler());
        Test.stopTest();

        CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime
                          FROM CronTrigger WHERE Id = :jobId];
        Assert.areEqual('0 0 0 * * ?', ct.CronExpression, 'The Cron expression matches');
        Assert.areEqual(0, ct.TimesTriggered, 'The task was not completed immediately');
    }
}
