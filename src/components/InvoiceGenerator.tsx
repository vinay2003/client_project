
import { Order } from "@/types";
import { toast } from "@/hooks/use-toast";

export const downloadInvoice = (order: Order) => {
  // In a real app, this would generate a real PDF using a library like jspdf or call a backend API
  // For this demo, we'll just show a toast indicating the invoice has been downloaded
  
  // Format filename with order ID and date
  const orderDate = new Date(order.createdAt);
  const filename = `Invoice_${order.id}_${orderDate.getFullYear()}${String(orderDate.getMonth() + 1).padStart(2, '0')}${String(orderDate.getDate()).padStart(2, '0')}.pdf`;
  
  // Simulate download delay
  setTimeout(() => {
    toast({
      title: "Invoice downloaded",
      description: `${filename} has been downloaded.`
    });
  }, 500);
  
  // Log what would be in the invoice
  console.log("Generated invoice for order:", order.id);
  console.log("Customer:", `${order.customer.firstName} ${order.customer.lastName}`);
  console.log("Items:", order.items.map(item => `${item.product.name} x ${item.quantity}`));
  console.log("Total:", order.totalAmount);
  console.log("Shipping Address:", order.shippingAddress);
  console.log("Billing Address:", order.billingAddress);
  console.log("Payment Method:", order.paymentMethod);
  console.log("Payment Status:", order.paymentStatus);
};

// Function to generate invoice HTML (for a more realistic demo)
export const generateInvoiceHTML = (order: Order): string => {
  const orderDate = new Date(order.createdAt).toLocaleDateString();
  
  const itemsHTML = order.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.product.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${order.id}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .invoice-header { text-align: center; margin-bottom: 30px; }
        .invoice-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #5d4037; }
        .company-name { font-size: 20px; margin-bottom: 5px; color: #5d4037; }
        .invoice-details { margin-bottom: 30px; }
        .details-row { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .details-column { width: 45%; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { background-color: #f9f4f0; text-align: left; padding: 10px; }
        .invoice-total { text-align: right; margin-top: 20px; }
        .total-row { margin-top: 10px; }
        .total-label { font-weight: bold; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <div class="company-name">Larana Jewelry</div>
        <div class="invoice-title">INVOICE</div>
        <div>123 Luxury Avenue, New York, NY 10001</div>
        <div>+1 (212) 555-1234 | sales@larana.com</div>
      </div>
      
      <div class="invoice-details">
        <div class="details-row">
          <div class="details-column">
            <strong>Billed To:</strong><br>
            ${order.billingAddress.firstName} ${order.billingAddress.lastName}<br>
            ${order.billingAddress.street}${order.billingAddress.apartment ? `, ${order.billingAddress.apartment}` : ''}<br>
            ${order.billingAddress.city}, ${order.billingAddress.state} ${order.billingAddress.zipCode}<br>
            ${order.billingAddress.country}<br>
            ${order.customer.email}
          </div>
          <div class="details-column" style="text-align: right;">
            <strong>Invoice Number:</strong> ${order.id}<br>
            <strong>Date:</strong> ${orderDate}<br>
            <strong>Payment Status:</strong> ${order.paymentStatus.toUpperCase()}<br>
            <strong>Payment Method:</strong> ${order.paymentMethod}
          </div>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align: center;">Quantity</th>
            <th style="text-align: right;">Price</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      
      <div class="invoice-total">
        <div class="total-row">
          <span class="total-label">Subtotal:</span> 
          <span>$${order.totalAmount.toFixed(2)}</span>
        </div>
        <div class="total-row">
          <span class="total-label">Shipping:</span> 
          <span>$0.00</span>
        </div>
        <div class="total-row">
          <span class="total-label">Tax:</span> 
          <span>$0.00</span>
        </div>
        <div class="total-row" style="font-size: 18px; margin-top: 10px;">
          <span class="total-label">Total:</span> 
          <span>$${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="footer">
        Thank you for your business! <br>
        For any questions regarding this invoice, please contact our customer service at support@larana.com
      </div>
    </body>
    </html>
  `;
};

// Function to open invoice in a new window for printing or saving
export const printInvoice = (order: Order) => {
  const invoiceHTML = generateInvoiceHTML(order);
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.focus();
    
    // In a real app, we might want to wait for the window to load
    setTimeout(() => {
      printWindow.print();
      // Optional: close after print
      // printWindow.close();
    }, 500);
  } else {
    toast({
      title: "Error",
      description: "Please allow pop-ups for this website to view the invoice.",
      variant: "destructive"
    });
  }
};
