import React from 'react';
import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-earth-900 dark:text-earth-100 mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-sm text-earth-500 dark:text-earth-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>At 10xsales.app ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our automotive sales CRM platform.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name and contact information</li>
            <li>Dealership affiliation</li>
            <li>Sales performance data</li>
            <li>Customer relationship information</li>
            <li>Commission and transaction details</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain our CRM service</li>
            <li>Track and analyze sales performance</li>
            <li>Process commission calculations</li>
            <li>Manage customer relationships</li>
            <li>Improve our platform and user experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure data backup procedures</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p>For any privacy-related questions or concerns, please contact us at:</p>
          <p>Email: privacy@10xsales.app</p>
          <p>Phone: 1-800-555-1234</p>
        </section>

        <div className="mt-8 pt-8 border-t border-earth-200 dark:border-earth-700">
          <p>
            <Link to="/terms" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              View Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}