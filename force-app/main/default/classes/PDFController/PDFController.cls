public with sharing class PDFController {
    public String clientName { get; private set; }
    public String orderDetails { get; private set; }

    public PDFController() {
        clientName = 'Иван Иванов';
        orderDetails = 'Машина LADA Vesta, 2024 года выпуска.';
    }
}