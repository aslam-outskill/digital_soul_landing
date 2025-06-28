import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Users, Eye, FileText, Heart, AlertTriangle, Phone, Mail } from 'lucide-react';
import Logo from '../components/Logo';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: <Eye className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Digital Soul handles deeply personal and sensitive data to create AI-powered digital personas. 
            This Privacy Policy outlines our privacy protections, ethical considerations, and consent management 
            systems that ensure responsible handling of your data and digital legacies.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We understand that you're entrusting us with your most precious memories, and we take this 
            responsibility seriously. This policy explains how we collect, use, protect, and manage your 
            personal information in accordance with the highest privacy standards.
          </p>
        </div>
      )
    },
    {
      id: 'principles',
      title: 'Core Privacy Principles',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">1. Data Minimization</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Collect Only Necessary Data:</strong> We only gather data that directly contributes to personality modeling</li>
              <li>• <strong>Purpose Limitation:</strong> We use data solely for creating and maintaining digital personas</li>
              <li>• <strong>Storage Limitation:</strong> We implement automated data retention and deletion policies</li>
              <li>• <strong>Regular Audits:</strong> We conduct quarterly reviews of stored data and remove unnecessary information</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">2. User Control and Consent</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Granular Consent:</strong> You can choose specific data types to include or exclude</li>
              <li>• <strong>Withdrawal Rights:</strong> You can revoke consent for any data category at any time</li>
              <li>• <strong>Consent Renewal:</strong> Annual consent renewal required for continued data processing</li>
              <li>• <strong>Clear Communication:</strong> Plain language explanations of data use and processing</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">3. Transparency and Accountability</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Data Processing Log:</strong> We maintain detailed records of all data processing activities</li>
              <li>• <strong>Regular Reports:</strong> We provide quarterly reports on your data usage</li>
              <li>• <strong>Algorithm Transparency:</strong> We explain how personality models are created and trained</li>
              <li>• <strong>Open Source Components:</strong> We use open-source tools where possible for transparency</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'ethical-framework',
      title: 'Ethical Framework',
      icon: <Heart className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Dignity and Respect</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-green-800 mb-2">Digital personas must:</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Respect the dignity and memory of the deceased</li>
                  <li>• Maintain authentic representation without fabrication</li>
                  <li>• Preserve the individual's values and beliefs accurately</li>
                  <li>• Avoid creating content that contradicts known personality traits</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-800 mb-2">Digital personas must not:</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Generate statements that would harm the deceased's reputation</li>
                  <li>• Create false memories or experiences</li>
                  <li>• Engage in activities the person would have opposed</li>
                  <li>• Provide advice on topics beyond their known expertise</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Family and Relationship Considerations</h4>
            <p className="text-gray-700 mb-3">
              We understand that digital personas affect entire families and communities. Our platform includes:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Clear succession planning for persona management after death</li>
              <li>• Family member consent requirements for ongoing interactions</li>
              <li>• Dispute resolution processes for conflicting family wishes</li>
              <li>• Healthy grieving support and professional counseling resources</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Technical Privacy Safeguards',
      icon: <Lock className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Data Encryption and Security</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Data at Rest:</strong> AES-256 encryption for all stored data</li>
                <li>• <strong>Data in Transit:</strong> TLS 1.3 for all communications</li>
                <li>• <strong>Key Management:</strong> Hardware Security Module (HSM) for key storage</li>
                <li>• <strong>Access Controls:</strong> Multi-factor authentication for all administrative access</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Access Control Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Data Access</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Persona Interaction</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Settings Modification</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Data Export</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Primary User</td>
                    <td className="border border-gray-300 px-4 py-2">Full</td>
                    <td className="border border-gray-300 px-4 py-2">Full</td>
                    <td className="border border-gray-300 px-4 py-2">Full</td>
                    <td className="border border-gray-300 px-4 py-2">Full</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Administrator</td>
                    <td className="border border-gray-300 px-4 py-2">System logs only</td>
                    <td className="border border-gray-300 px-4 py-2">No</td>
                    <td className="border border-gray-300 px-4 py-2">System settings only</td>
                    <td className="border border-gray-300 px-4 py-2">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Family (Full)</td>
                    <td className="border border-gray-300 px-4 py-2">Limited profile</td>
                    <td className="border border-gray-300 px-4 py-2">Full conversation</td>
                    <td className="border border-gray-300 px-4 py-2">No</td>
                    <td className="border border-gray-300 px-4 py-2">Limited</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Family (Limited)</td>
                    <td className="border border-gray-300 px-4 py-2">Basic info only</td>
                    <td className="border border-gray-300 px-4 py-2">Restricted topics</td>
                    <td className="border border-gray-300 px-4 py-2">No</td>
                    <td className="border border-gray-300 px-4 py-2">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'consent',
      title: 'Consent Management System',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Initial Consent Process</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">Step 1: Data Collection Consent</h5>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>□ Text messages and communications</li>
                  <li>□ Voice recordings and phone calls</li>
                  <li>□ Photos and video content</li>
                  <li>□ Social media posts and interactions</li>
                  <li>□ Written documents and notes</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">Step 2: Processing Consent</h5>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>□ Personality trait analysis</li>
                  <li>□ Communication style modeling</li>
                  <li>□ Voice pattern extraction</li>
                  <li>□ Facial expression analysis</li>
                  <li>□ Behavioral pattern recognition</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">Step 3: Usage Consent</h5>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>□ Family member interactions</li>
                  <li>□ Automated responses to messages</li>
                  <li>□ Voice synthesis capabilities</li>
                  <li>□ Video avatar generation</li>
                  <li>□ Public memorial features</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Ongoing Consent Management</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Quarterly Reviews:</strong> Regular opportunities to review and update consent preferences</li>
              <li>• <strong>Granular Controls:</strong> Enable/disable specific features or data types at any time</li>
              <li>• <strong>Emergency Overrides:</strong> Designated family members can limit access in crisis situations</li>
              <li>• <strong>Professional Support:</strong> Access to grief counselors and digital legacy specialists</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'rights',
      title: 'Your Rights and Protections',
      icon: <FileText className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Data Subject Rights (GDPR Compliant)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Right to Access:</strong> Complete data export in standard formats</li>
                <li>• <strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
                <li>• <strong>Right to Erasure:</strong> Complete data deletion ("right to be forgotten")</li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Right to Portability:</strong> Transfer data to other services</li>
                <li>• <strong>Right to Object:</strong> Opt-out of specific processing activities</li>
                <li>• <strong>Right to Restrict:</strong> Limit how we process your data</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Digital Legacy Rights</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Representation Accuracy:</strong> Ensure personas reflect authentic personality</li>
              <li>• <strong>Memorial Dignity:</strong> Maintain respectful and appropriate interactions</li>
              <li>• <strong>Family Harmony:</strong> Mediation services for family disputes over persona access</li>
              <li>• <strong>Professional Support:</strong> Access to grief counseling and digital legacy planning</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Psychological Safety Measures</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Health Monitoring:</strong> Detection of signs of unhealthy dependence on persona interactions</li>
              <li>• <strong>Professional Referrals:</strong> Connection to appropriate mental health support</li>
              <li>• <strong>Gradual Transition:</strong> Structured approaches to reduce persona dependence over time</li>
              <li>• <strong>Crisis Intervention:</strong> Emergency protocols for users in psychological distress</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'compliance',
      title: 'Compliance and Legal Framework',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">International Privacy Laws</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>GDPR Compliance:</strong> Full compliance with European privacy regulations</li>
                <li>• <strong>CCPA Compliance:</strong> California Consumer Privacy Act requirements</li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>PIPEDA Compliance:</strong> Personal Information Protection and Electronic Documents Act (Canada)</li>
                <li>• <strong>Local Regulations:</strong> Adaptation to country-specific privacy and digital rights laws</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Industry Standards</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>ISO 27001:</strong> Information security management certification</li>
              <li>• <strong>SOC 2 Type II:</strong> Annual security and availability audits</li>
              <li>• <strong>Privacy by Design:</strong> Built-in privacy protections from system inception</li>
              <li>• <strong>Ethical AI Standards:</strong> Compliance with emerging AI ethics frameworks</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact and Support',
      icon: <Phone className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-blue-900 mb-2">Privacy Officer</h4>
              <p className="text-sm text-blue-800 mb-2">privacy@digitalsoulapp.ch</p>
              <p className="text-xs text-blue-700">Response Time: 48 hours</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <Heart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-900 mb-2">Ethics Committee</h4>
              <p className="text-sm text-purple-800 mb-2">ethics@digitalsoulapp.ch</p>
              <p className="text-xs text-purple-700">Response Time: 72 hours</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 text-center">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h4 className="font-semibold text-red-900 mb-2">Emergency Support</h4>
              <p className="text-sm text-red-800 mb-2">1-800-DIGITAL-SOUL</p>
              <p className="text-xs text-red-700">24/7 Crisis Support</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Support Network</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Certified Grief Counselors:</strong> Mental health professionals trained in digital legacy issues</li>
                <li>• <strong>Legal Estate Planners:</strong> Lawyers specializing in digital asset planning</li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Digital Ethics Consultants:</strong> Experts in AI ethics and digital persona creation</li>
                <li>• <strong>Technical Support:</strong> 24/7 technical assistance and troubleshooting</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo className="w-8 h-8" textClassName="text-xl text-gray-900" />
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-6 py-3 mb-6">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Privacy & Ethics</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your privacy and the ethical handling of your digital legacy are our highest priorities. 
                This policy explains how we protect and honor your trust.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-purple-600">{section.icon}</div>
                  <span className="text-gray-700 hover:text-purple-600">{section.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                {section.content}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 bg-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Document Updates
            </h3>
            <p className="text-gray-600 mb-4">
              This Privacy Policy is reviewed and updated quarterly to ensure continued compliance 
              with evolving privacy laws, ethical standards, and user needs.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 2024 • Next review: April 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;