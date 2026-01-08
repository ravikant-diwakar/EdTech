import React from 'react';
import { Shield, Eye, Database, UserCheck, Mail, Phone } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="flex-grow bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Last updated: July 08, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Introduction */}
          <section>
            {/* <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Eye size={24} className="mr-3 text-blue-400" />
              Introduction
            </h2> */}
            <p className="mb-4">
              At SkillN ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered interview preparation platform.
            </p>
            <p>
              By using our service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Database size={24} className="mr-3 text-white" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-medium text-white mb-3">Personal Information</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
              <li>Name and email address when you create an account</li>
              <li>Username and password for account authentication</li>
              <li>Profile information you choose to provide</li>
              <li>Communication preferences and settings</li>
            </ul>

            <h3 className="text-xl font-medium text-white mb-3">Resume and Career Information</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
              <li>Resume content uploaded for analysis</li>
              <li>Work experience and educational background</li>
              <li>Skills, certifications, and project information</li>
              <li>Career goals and preferences</li>
            </ul>

            <h3 className="text-xl font-medium text-white mb-3">Usage Information</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
              <li>How you interact with our platform</li>
              <li>Features used and time spent on the platform</li>
              <li>Device information and browser type</li>
              <li>IP address and general location information</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              {/* <UserCheck size={24} className="mr-3 text-purple-400" /> */}
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide personalized AI-powered resume analysis and interview preparation</li>
              <li>Generate tailored interview questions and study recommendations</li>
              <li>Improve our AI models and platform functionality</li>
              <li>Send you important updates about our service</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Ensure platform security and prevent fraudulent activity</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our platform</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              <li><strong>Consent:</strong> We may share information with your explicit consent</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us using the information provided in the Contact section.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze platform usage and performance</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure platform security</li>
            </ul>
            <p className="mt-4">
              You can control cookie settings through your browser preferences, but disabling cookies may affect platform functionality.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
            <p>
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are conducted in accordance with applicable data protection laws and that appropriate safeguards are in place to protect your information.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          {/* <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Mail size={24} className="mr-3 text-yellow-400" />
              Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail size={20} className="mr-3 text-blue-400" />
                  <span>Email: privacy@skilln.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={20} className="mr-3 text-green-400" />
                  <span>Phone: +1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;