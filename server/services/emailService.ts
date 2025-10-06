/**
 * Email Service for Order Confirmations and Solar Consultations
 */

import nodemailer from 'nodemailer';

const solarTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rob@fusiondataco.com',
    pass: 'rwmd xptq npdd phhg'
  }
});

interface SolarConsultationData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  serviceNeeded: string;
  currentElectricBill?: string;
  roofType?: string;
  roofAge?: string;
  shadingIssues?: string;
  systemSizePreference?: string;
  timeline?: string;
  additionalNotes?: string;
}

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

/**
 * Send solar consultation notification email
 */
export async function sendSolarConsultationEmail(data: SolarConsultationData): Promise<boolean> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #0ea5e9); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 30px; background: #f9fafb; }
          .detail-section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #2563eb; }
          .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: bold; width: 200px; color: #6b7280; }
          .detail-value { flex: 1; color: #111827; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .priority-badge { display: inline-block; padding: 4px 12px; background: #ef4444; color: white; border-radius: 4px; font-size: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">☀️ New Solar Consultation Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Advance Power Redding - CRM System</p>
          </div>
          
          <div class="content">
            <div class="detail-section">
              <h2 style="margin-top: 0; color: #2563eb;">Customer Information</h2>
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${data.customerName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Address:</div>
                <div class="detail-value">${data.address}</div>
              </div>
            </div>

            <div class="detail-section">
              <h2 style="margin-top: 0; color: #2563eb;">Project Details</h2>
              <div class="detail-row">
                <div class="detail-label">Property Type:</div>
                <div class="detail-value">${data.propertyType}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Service Needed:</div>
                <div class="detail-value"><strong>${data.serviceNeeded}</strong></div>
              </div>
              ${data.currentElectricBill ? `
              <div class="detail-row">
                <div class="detail-label">Current Electric Bill:</div>
                <div class="detail-value">${data.currentElectricBill}</div>
              </div>` : ''}
              ${data.roofType ? `
              <div class="detail-row">
                <div class="detail-label">Roof Type:</div>
                <div class="detail-value">${data.roofType}</div>
              </div>` : ''}
              ${data.roofAge ? `
              <div class="detail-row">
                <div class="detail-label">Roof Age:</div>
                <div class="detail-value">${data.roofAge}</div>
              </div>` : ''}
              ${data.shadingIssues ? `
              <div class="detail-row">
                <div class="detail-label">Shading Issues:</div>
                <div class="detail-value">${data.shadingIssues}</div>
              </div>` : ''}
              ${data.systemSizePreference ? `
              <div class="detail-row">
                <div class="detail-label">System Size Preference:</div>
                <div class="detail-value">${data.systemSizePreference}</div>
              </div>` : ''}
              ${data.timeline ? `
              <div class="detail-row">
                <div class="detail-label">Timeline:</div>
                <div class="detail-value"><span class="priority-badge">${data.timeline}</span></div>
              </div>` : ''}
            </div>

            ${data.additionalNotes ? `
            <div class="detail-section">
              <h2 style="margin-top: 0; color: #2563eb;">Additional Notes</h2>
              <p style="margin: 0; white-space: pre-wrap;">${data.additionalNotes}</p>
            </div>` : ''}

            <div style="margin-top: 30px; padding: 20px; background: #dbeafe; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #1e40af; font-weight: bold;">⚡ Action Required</p>
              <p style="margin: 10px 0 0 0; color: #1e40af;">Please follow up with this customer within 24 hours</p>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the Advance Power Redding CRM System</p>
            <p>&copy; ${new Date().getFullYear()} Advance Power Redding. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await solarTransporter.sendMail({
      from: '"Advance Power Redding CRM" <rob@fusiondataco.com>',
      to: 'gtomsik@apredding.net, office@apredding.net',
      subject: `New Solar Consultation Request - ${data.customerName}`,
      html: htmlContent
    });

    console.log(`✅ Solar consultation email sent for ${data.customerName}`);
    return true;
  } catch (error) {
    console.error('❌ Solar consultation email sending error:', error);
    return false;
  }
}

export default {
  sendOrderConfirmation,
  sendSolarConsultationEmail
};
