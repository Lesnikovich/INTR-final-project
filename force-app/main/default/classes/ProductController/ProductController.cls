public without sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<String> getProductFamilies() {
        List<AggregateResult> results = [SELECT Family FROM Product2 WHERE Family != null GROUP BY Family];
        List<String> families = new List<String>();
        for (AggregateResult ar : results) {
            families.add((String)ar.get('Family'));
        }
        return families;
    }
}
