import React from 'react';
import { FileText, Users, Shield, AlertTriangle, Scale, Gavel } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <main className="flex-grow bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Last updated: July 08, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Users size={24} className="mr-3 text-white" />
              Agreement to Terms
            </h2>
            <p className="mb-4">
              Welcome to SkillN! These Terms of Service ("Terms") govern your use of our AI-powered interview preparation platform and services. By accessing or using our service, you agree to be bound by these Terms.
            </p>
            <p className="mb-4">
              If you do not agree to these Terms, please do not use our service. We reserve the right to modify these Terms at any time, and your continued use of the service constitutes acceptance of any changes.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Shield size={24} className="mr-3 text-white" />
              Description of Service
            </h2>
            <p className="mb-4">
              SkillN provides AI-powered interview preparation services, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Resume analysis and optimization recommendations</li>
              <li>Personalized interview question generation</li>
              <li>LinkedIn profile enhancement suggestions</li>
              <li>Mock interview simulations and feedback</li>
              <li>Career preparation resources and study materials</li>
              <li>AI-powered coaching and guidance</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Accounts and Registration</h2>
            <p className="mb-4">
              To access certain features of our service, you must create an account. When creating an account, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
            <p className="mt-4">
              You must be at least 13 years old to create an account. If you are under 18, you represent that you have parental consent to use our service.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <AlertTriangle size={24} className="mr-3 text-white" />
              Acceptable Use Policy
            </h2>
            <p className="mb-4">
              You agree to use our service only for lawful purposes and in accordance with these Terms. You agree NOT to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Upload false, misleading, or fraudulent information</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our service or servers</li>
              <li>Use our service for any commercial purpose without permission</li>
              <li>Share your account credentials with others</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Reverse engineer or attempt to extract our AI models</li>
            </ul>
          </section>

          {/* Content and Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Content and Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-white mb-3">Your Content</h3>
            <p className="mb-4">
              You retain ownership of any content you upload to our service, including resumes and personal information. By uploading content, you grant us a limited, non-exclusive license to use, process, and analyze your content to provide our services.
            </p>

            <h3 className="text-xl font-medium text-white mb-3">Our Content</h3>
            <p className="mb-4">
              All content provided by SkillN, including AI-generated recommendations, analysis, and platform features, is our intellectual property. You may not copy, distribute, or create derivative works without our written permission.
            </p>

            <h3 className="text-xl font-medium text-white mb-3">Third-Party Content</h3>
            <p>
              Our service may include content from third parties. We do not endorse or assume responsibility for third-party content, and your use of such content is at your own risk.
            </p>
          </section>

          {/* AI Services and Limitations */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">AI Services and Limitations</h2>
            <p className="mb-4">
              Our AI-powered services are designed to assist with interview preparation, but you acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>AI recommendations are suggestions, not guarantees of success</li>
              <li>Results may vary based on individual circumstances</li>
              <li>AI analysis is based on patterns and may not be perfect</li>
              <li>You should use your own judgment when following recommendations</li>
              <li>We do not guarantee job placement or interview success</li>
              <li>AI models are continuously improving and may change over time</li>
            </ul>
          </section>

          {/* Privacy and Data Use */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Privacy and Data Use</h2>
            <p className="mb-4">
              Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            <p>
              By using our service, you consent to the collection, use, and processing of your information as described in our Privacy Policy.
            </p>
          </section>

          {/* Payment and Subscriptions */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Payment and Subscriptions</h2>
            <p className="mb-4">
              Some features of our service may require payment. If you purchase a subscription or premium features:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You agree to pay all applicable fees</li>
              <li>Payments are processed securely through third-party providers</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>Refunds are subject to our refund policy</li>
              <li>We may change pricing with advance notice</li>
              <li>You are responsible for applicable taxes</li>
            </ul>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Service Availability and Modifications</h2>
            <p className="mb-4">
              We strive to provide reliable service, but we do not guarantee uninterrupted availability. We reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify, suspend, or discontinue any part of our service</li>
              <li>Perform maintenance and updates</li>
              <li>Change features and functionality</li>
              <li>Set usage limits and restrictions</li>
            </ul>
            <p className="mt-4">
              We will provide reasonable notice of significant changes when possible.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              {/* <Scale size={24} className="mr-3 text-purple-400" /> */}
              Disclaimers and Limitation of Liability
            </h2>
            <p className="mb-4">
              OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
              <li>MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>ACCURACY, RELIABILITY, OR COMPLETENESS OF CONTENT</li>
              <li>UNINTERRUPTED OR ERROR-FREE OPERATION</li>
              <li>SECURITY OR FREEDOM FROM VIRUSES</li>
            </ul>
            
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE.
            </p>
            
            <p>
              OUR TOTAL LIABILITY TO YOU SHALL NOT EXCEED THE AMOUNT YOU PAID FOR OUR SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless SkillN and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our service, violation of these Terms, or infringement of any rights of another party.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
            <p className="mb-4">
              Either party may terminate this agreement at any time:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You may delete your account and stop using our service</li>
              <li>We may suspend or terminate your account for violation of these Terms</li>
              <li>We may discontinue our service with reasonable notice</li>
            </ul>
            <p className="mt-4">
              Upon termination, your right to use our service ceases immediately, but these Terms shall survive termination as applicable.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              {/* <Gavel size={24} className="mr-3 text-red-400" /> */}
              Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4">
              These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles. Any disputes arising from these Terms or your use of our service shall be resolved through:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Good faith negotiation between the parties</li>
              <li>Binding arbitration if negotiation fails</li>
              <li>Courts of competent jurisdiction in [Your Jurisdiction] for non-arbitrable matters</li>
            </ul>
          </section>

          {/* Miscellaneous */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Miscellaneous</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and SkillN</li>
              <li><strong>Severability:</strong> If any provision is found unenforceable, the remainder shall remain in effect</li>
              <li><strong>Waiver:</strong> Our failure to enforce any right does not waive that right</li>
              <li><strong>Assignment:</strong> You may not assign these Terms without our consent</li>
              <li><strong>Force Majeure:</strong> We are not liable for delays due to circumstances beyond our control</li>
            </ul>
          </section>

          {/* Contact Information */}
          {/* <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="space-y-3">
                <div className="flex items-center">
                  <FileText size={20} className="mr-3 text-blue-400" />
                  <span>Email: legal@skilln.com</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="mr-3 text-green-400" />
                  <span>Support: support@skilln.com</span>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;