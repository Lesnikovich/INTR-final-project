public with sharing class CurrencyUpdateScheduler implements Schedulable {
    public void execute(SchedulableContext sc) {
        CurrencyRateUpdater.upsertRecord();
    }
}