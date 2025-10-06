/**
 * Email Service for Order Confirmations
 * 
 * This service handles sending order confirmation emails to customers.
 * Currently configured with console.log for development/testing.
 * 
 * TO ENABLE EMAIL SENDING:
 * 
 * Option 1 - SendGrid:
 * 1. Install: npm install @sendgrid/mail
 * 2. Add SENDGRID_API_KEY to environment variables
 * 3. Uncomment the SendGrid implementation below
 * 
 * Option 2 - Mailgun:
 * 1. Install: npm install mailgun-js
 * 2. Add MAILGUN_API_KEY and MAILGUN_DOMAIN to environment variables
 * 3. Uncomment the Mailgun implementation below
 * 
 * Option 3 - SMTP (Nodemailer):
 * 1. Install: npm install nodemailer
 * 2. Add SMTP credentials to environment variables
 * 3. Uncomment the Nodemailer implementation below
 */

interface OrderConfirmationData {
  orderNumber: string;
  email: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    subtotal: string;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
  paymentMethod: string;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(data: OrderConfirmationData): Promise<boolean> {
  try {
    console.log('====== ORDER CONFIRMATION EMAIL ======');
    console.log(`To: ${data.email}`);
    console.log(`Order Number: ${data.orderNumber}`);
    console.log(`Customer: ${data.customerName}`);
    console.log('\nItems:');
    data.items.forEach(item => {
      console.log(`  - ${item.name} (x${item.quantity}) - $${item.subtotal}`);
    });
    console.log('\nShipping Address:');
    console.log(`  ${data.shippingAddress.name}`);
    console.log(`  ${data.shippingAddress.address}`);
    console.log(`  ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zip}`);
    console.log(`  Phone: ${data.shippingAddress.phone}`);
    console.log('\nOrder Total:');
    console.log(`  Subtotal: $${data.subtotal}`);
    console.log(`  Tax: $${data.tax}`);
    console.log(`  Shipping: $${data.shipping}`);
    console.log(`  Total: $${data.total}`);
    console.log(`\nPayment Method: ${data.paymentMethod}`);
    console.log('\nEstimated Delivery: 5-7 business days');
    console.log('======================================');

    return true;

    /* SENDGRID IMPLEMENTATION (uncomment to enable)
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: data.email,
      from: 'office@apredding.net',
      subject: `Order Confirmation - ${data.orderNumber}`,
      html: generateOrderEmailHTML(data)
    };

    await sgMail.send(msg);
    return true;
    */

    /* MAILGUN IMPLEMENTATION (uncomment to enable)
    const mailgun = require('mailgun-js');
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
    });

    const emailData = {
      from: 'Advance Power Redding <office@apredding.net>',
      to: data.email,
      subject: `Order Confirmation - ${data.orderNumber}`,
      html: generateOrderEmailHTML(data)
    };

    await mg.messages().send(emailData);
    return true;
    */

    /* NODEMAILER IMPLEMENTATION (uncomment to enable)
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: '"Advance Power Redding" <office@apredding.net>',
      to: data.email,
      subject: `Order Confirmation - ${data.orderNumber}`,
      html: generateOrderEmailHTML(data)
    });
    
    return true;
    */
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

/**
 * Generate HTML email template
 */
function generateOrderEmailHTML(data: OrderConfirmationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .items-table th, .items-table td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .total-row { font-weight: bold; font-size: 18px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Order #${data.orderNumber}</p>
        </div>
        
        <div class="content">
          <h2>Thank you for your order, ${data.customerName}!</h2>
          <p>We've received your order and will process it shortly.</p>
          
          <div class="order-details">
            <h3>Order Items</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${data.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price}</td>
                    <td>$${item.subtotal}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td colspan="3">Subtotal</td>
                  <td>$${data.subtotal}</td>
                </tr>
                <tr>
                  <td colspan="3">Tax</td>
                  <td>$${data.tax}</td>
                </tr>
                <tr>
                  <td colspan="3">Shipping</td>
                  <td>$${data.shipping}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="3">Total</td>
                  <td>$${data.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="order-details">
            <h3>Shipping Address</h3>
            <p>
              ${data.shippingAddress.name}<br>
              ${data.shippingAddress.address}<br>
              ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zip}<br>
              Phone: ${data.shippingAddress.phone}
            </p>
          </div>
          
          <div class="order-details">
            <h3>Next Steps</h3>
            <p>• Your order will be processed within 1-2 business days</p>
            <p>• Estimated delivery: 5-7 business days</p>
            <p>• You will receive a shipping confirmation with tracking information</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Questions? Contact us at office@apredding.net</p>
          <p>&copy; ${new Date().getFullYear()} Advance Power Redding. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default {
  sendOrderConfirmation
};
