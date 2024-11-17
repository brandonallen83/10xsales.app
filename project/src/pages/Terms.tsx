import React from 'react';
import { Link } from 'react-router-dom';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-earth-900 dark:text-earth-100 mb-8">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-sm text-earth-500 dark:text-earth-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>By accessing or using 10xsales.app ("we," "our," or "us"), you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p>We grant you a limited, non-exclusive, non-transferable license to use our platform for your automotive sales professional activities. This license is subject to these Terms of Service.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Maintain accurate account information</li>
            <li>Protect your account credentials</li>
            <li>Comply with all applicable laws</li>
            <li>Respect customer privacy</li>
            <li>Use the platform ethically</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Subscription Terms</h2>
          <p>Your subscription will automatically renew unless cancelled. You may cancel at any time through your account settings.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Ownership</h2>
          <p>You retain ownership of your customer data. We maintain a limited license to use this data to provide and improve our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify you of any material changes via email or through the platform.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p>For questions about these Terms, please contact us at:</p>
          <p>Email: legal@10xsales.app</p>
          <p>Phone: 1-800-555-1234</p>
        </section>

        <div className="mt-8 pt-8 border-t border-earth-200 dark:border-earth-700">
          <p>
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              View Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}