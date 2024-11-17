public with sharing class CurrencyRateUpdater {
    @future(callout=true)
    public static void upsertRecord(){   
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.nbrb.by/exrates/rates?periodicity=0');
        request.setMethod('GET');
        
        try {
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                List<Object> rates = (List<Object>) JSON.deserializeUntyped(response.getBody());
            	updateCustomMetadata(rates);
            } else {
                System.debug('Error: ' + response.getStatus());
            }
        } catch (Exception e) {
            System.debug('Callout failed: ' + e.getMessage());
        }
    }
     
    private static void updateCustomMetadata(List<Object> rates) {
        Metadata.DeployContainer container = new Metadata.DeployContainer();
        for(Object rateObj : rates){
        	Map<String, Object> rate = (Map<String, Object>) rateObj;
            Metadata.CustomMetadata mdata = new Metadata.CustomMetadata();

            String abbr = (String)rate.get('Cur_Abbreviation');
            mdata.fullName = 'DailyRate__mdt.'+ abbr;
            mdata.label= abbr;
            
            Metadata.CustomMetadataValue instance = new Metadata.CustomMetadataValue();
            instance.field = 'Cur_Scale__c';
            instance.value = (Integer) rate.get('Cur_Scale');
            mdata.values.add(instance);
            
            Metadata.CustomMetadataValue instance1 = new Metadata.CustomMetadataValue();
            instance1.field = 'Cur_Abbreviation__c';
            instance1.value = abbr;
            mdata.values.add(instance1);
            
            Metadata.CustomMetadataValue instance2 = new Metadata.CustomMetadataValue();
            instance2.field = 'Cur_OfficialRate__c';
            instance2.value = (Decimal) rate.get('Cur_OfficialRate');
            mdata.values.add(instance2);

            container.addMetadata(mdata);
        } 
        Metadata.Operations.enqueueDeployment(container, null);
    }
}