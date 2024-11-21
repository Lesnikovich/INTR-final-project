public with sharing class CarCentersController {
   public class CarCenter {
      @AuraEnabled public Id id;
      @AuraEnabled public String name;
      @AuraEnabled public String phone;
      @AuraEnabled public String email;
      @AuraEnabled public String serialNumber;
      @AuraEnabled public String workingHours;
      @AuraEnabled public Map <String, String> addressMap = new Map<String, String>();
      @AuraEnabled public String address;

      public CarCenter(Id id, String name, String phone, String email, String serialNumber, String workingHours, Address address) {
          this.id = id;
          this.name = name;
          this.phone = phone;
          this.email = email;
          this.serialNumber = serialNumber;
          this.workingHours = workingHours;
          this.addressMap.put('city', address.getCity());
          this.addressMap.put('country', address.getCountry());
          this.addressMap.put('street', address.getStreet());
          this.address = JSON.serialize(this.addressMap);
      }
  }

    @AuraEnabled(cacheable=true)
    public static List<CarCenter> getCenterInfo(String recordTypeName){
      List <CarCenter__c> centerLIst = [SELECT Id, Name, Phone__c, Email__c, Serial_Number__c, Working_hours__c, Address__c
               FROM CarCenter__c
               WHERE RecordType.Name = :recordTypeName];   

      List<CarCenter> customCarCenterList = new List<CarCenter>();  
      for(CarCenter__c center : centerList) {
         customCarCenterList.add(new CarCenter(
               center.Id,
               center.Name,
               center.Phone__c,
               center.Email__c,
               center.Serial_Number__c,
               center.Working_hours__c,
               center.Address__c
            ));
      }
      return customCarCenterList;
   }
}