import { toast } from 'react-hot-toast';

const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const response = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
            subject: 'Welcome to AutoSalesPro!',
          },
        ],
        from: { email: 'welcome@autosalespro.com', name: 'AutoSalesPro Team' },
        content: [
          {
            type: 'text/html',
            value: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #4F46E5;">Welcome to AutoSalesPro, ${name}!</h1>
                <p>Thank you for joining our community of successful automotive sales professionals!</p>
                <p>With AutoSalesPro, you'll be able to:</p>
                <ul>
                  <li>Track your sales goals and progress</li>
                  <li>Get personalized coaching based on your experience level</li>
                  <li>Access proven sales techniques and strategies</li>
                  <li>Monitor your commission earnings</li>
                </ul>
                <p>If you have any questions, our support team is here to help!</p>
                <p>Best regards,<br>The AutoSalesPro Team</p>
              </div>
            `,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send welcome email');
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
    toast.error('Welcome email could not be sent, but your account was created successfully.');
  }
}