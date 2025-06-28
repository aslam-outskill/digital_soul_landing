import React from 'react';
import { Shield, Lock, Users, Award, Check } from 'lucide-react';

const Trust = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your memories are encrypted end-to-end and stored with military-grade security protocols."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Complete Privacy Control",
      description: "You decide who can access your Digital Soul. Share publicly, privately, or keep it just for yourself."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family-First Design",
      description: "Built specifically for families to connect across generations, not for corporate data harvesting."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Ethical AI Commitment",
      description: "Our AI is trained responsibly, respects your dignity, and never shares your data with third parties."
    }
  ];

  const principles = [
    "Your data belongs to you, always",
    "No advertising or data selling, ever",
    "Complete transparency in how AI processes your content",
    "Option to download or delete everything anytime",
    "Secure inheritance features for family access"
  ];

  const openPrivacyPolicy = () => {
    const privacyWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (privacyWindow) {
      privacyWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Privacy Policy - Digital Soul</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            html { scroll-behavior: smooth; }
            .animate-float { animation: float 6s ease-in-out infinite; }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
          </style>
        </head>
        <body class="bg-gradient-to-br from-gray-50 to-white">
          <div class="min-h-screen">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <!-- Header -->
              <div class="mb-8">
                <div class="text-center">
                  <div class="inline-flex items-center space-x-2 bg-purple-100 rounded-full px-6 py-3 mb-6">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-sm font-medium text-purple-800">Privacy & Ethics</span>
                  </div>
                  <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Privacy Policy
                  </h1>
                  <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Your privacy and the ethical handling of your digital legacy are our highest priorities. 
                    This policy explains how we protect and honor your trust.
                  </p>
                </div>
              </div>

              <!-- Table of Contents -->
              <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
                <div class="grid md:grid-cols-2 gap-2">
                  <a href="#overview" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Overview</span>
                  </a>
                  <a href="#principles" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Core Privacy Principles</span>
                  </a>
                  <a href="#ethical-framework" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Ethical Framework</span>
                  </a>
                  <a href="#security" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Technical Privacy Safeguards</span>
                  </a>
                  <a href="#consent" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Consent Management System</span>
                  </a>
                  <a href="#rights" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Your Rights and Protections</span>
                  </a>
                  <a href="#compliance" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Compliance and Legal Framework</span>
                  </a>
                  <a href="#contact" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span class="text-gray-700 hover:text-purple-600">Contact and Support</span>
                  </a>
                </div>
              </div>

              <!-- Overview Section -->
              <div id="overview" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Overview</h2>
                </div>
                <div class="space-y-4">
                  <p class="text-gray-700 leading-relaxed">
                    Digital Soul handles deeply personal and sensitive data to create AI-powered digital personas. 
                    This Privacy Policy outlines our privacy protections, ethical considerations, and consent management 
                    systems that ensure responsible handling of your data and digital legacies.
                  </p>
                  <p class="text-gray-700 leading-relaxed">
                    We understand that you're entrusting us with your most precious memories, and we take this 
                    responsibility seriously. This policy explains how we collect, use, protect, and manage your 
                    personal information in accordance with the highest privacy standards.
                  </p>
                </div>
              </div>

              <!-- Core Privacy Principles Section -->
              <div id="principles" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Core Privacy Principles</h2>
                </div>
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">1. Data Minimization</h4>
                    <ul class="space-y-2 text-gray-700">
                      <li>• <strong>Collect Only Necessary Data:</strong> We only gather data that directly contributes to personality modeling</li>
                      <li>• <strong>Purpose Limitation:</strong> We use data solely for creating and maintaining digital personas</li>
                      <li>• <strong>Storage Limitation:</strong> We implement automated data retention and deletion policies</li>
                      <li>• <strong>Regular Audits:</strong> We conduct quarterly reviews of stored data and remove unnecessary information</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">2. User Control and Consent</h4>
                    <ul class="space-y-2 text-gray-700">
                      <li>• <strong>Granular Consent:</strong> You can choose specific data types to include or exclude</li>
                      <li>• <strong>Withdrawal Rights:</strong> You can revoke consent for any data category at any time</li>
                      <li>• <strong>Consent Renewal:</strong> Annual consent renewal required for continued data processing</li>
                      <li>• <strong>Clear Communication:</strong> Plain language explanations of data use and processing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">3. Transparency and Accountability</h4>
                    <ul class="space-y-2 text-gray-700">
                      <li>• <strong>Data Processing Log:</strong> We maintain detailed records of all data processing activities</li>
                      <li>• <strong>Regular Reports:</strong> We provide quarterly reports on your data usage</li>
                      <li>• <strong>Algorithm Transparency:</strong> We explain how personality models are created and trained</li>
                      <li>• <strong>Open Source Components:</strong> We use open-source tools where possible for transparency</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Ethical Framework Section -->
              <div id="ethical-framework" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Ethical Framework</h2>
                </div>
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">1. Dignity and Respect</h4>
                    <div class="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 class="font-medium text-green-800 mb-2">Digital personas must:</h5>
                        <ul class="space-y-1 text-sm text-gray-700">
                          <li>• Respect the dignity and memory of the deceased</li>
                          <li>• Maintain authentic representation without fabrication</li>
                          <li>• Preserve the individual's values and beliefs accurately</li>
                          <li>• Avoid creating content that contradicts known personality traits</li>
                        </ul>
                      </div>
                      <div>
                        <h5 class="font-medium text-red-800 mb-2">Digital personas must not:</h5>
                        <ul class="space-y-1 text-sm text-gray-700">
                          <li>• Generate statements that would harm the deceased's reputation</li>
                          <li>• Create false memories or experiences</li>
                          <li>• Engage in activities the person would have opposed</li>
                          <li>• Provide advice on topics beyond their known expertise</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">2. Family and Relationship Considerations</h4>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <p class="text-gray-700 text-sm leading-relaxed">
                        We recognize that digital personas affect entire families and communities. Our consent management 
                        system ensures that primary users maintain control while respecting family dynamics and providing 
                        clear succession planning for persona management after death.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">3. Cultural and Religious Sensitivity</h4>
                    <div class="bg-gray-50 rounded-lg p-4">
                      <p class="text-gray-700 text-sm leading-relaxed">
                        We respect diverse cultural beliefs about death, memory, and digital representations. Our platform 
                        accommodates religious restrictions and provides culturally appropriate interaction styles across 
                        multiple languages and cultural contexts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Technical Privacy Safeguards Section -->
              <div id="security" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Technical Privacy Safeguards</h2>
                </div>
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Encryption Standards</h4>
                    <div class="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                      <div>Data at Rest: AES-256 encryption for all stored data</div>
                      <div>Data in Transit: TLS 1.3 for all communications</div>
                      <div>Key Management: Hardware Security Module (HSM) for key storage</div>
                      <div>Access Controls: Multi-factor authentication for all administrative access</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Access Control Matrix</h4>
                    <div class="overflow-x-auto">
                      <table class="min-w-full bg-gray-50 rounded-lg">
                        <thead class="bg-gray-100">
                          <tr>
                            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
                            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Data Access</th>
                            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Persona Interaction</th>
                            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Settings Modification</th>
                            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Data Export</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                          <tr>
                            <td class="px-4 py-2 text-sm text-gray-900">Primary User</td>
                            <td class="px-4 py-2 text-sm text-green-600">Full</td>
                            <td class="px-4 py-2 text-sm text-green-600">Full</td>
                            <td class="px-4 py-2 text-sm text-green-600">Full</td>
                            <td class="px-4 py-2 text-sm text-green-600">Full</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 text-sm text-gray-900">Administrator</td>
                            <td class="px-4 py-2 text-sm text-yellow-600">System logs only</td>
                            <td class="px-4 py-2 text-sm text-red-600">No</td>
                            <td class="px-4 py-2 text-sm text-yellow-600">System settings only</td>
                            <td class="px-4 py-2 text-sm text-red-600">No</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 text-sm text-gray-900">Family (Full)</td>
                            <td class="px-4 py-2 text-sm text-yellow-600">Limited profile</td>
                            <td class="px-4 py-2 text-sm text-green-600">Full conversation</td>
                            <td class="px-4 py-2 text-sm text-red-600">No</td>
                            <td class="px-4 py-2 text-sm text-yellow-600">Limited</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 text-sm text-gray-900">Family (Limited)</td>
                            <td class="px-4 py-2 text-sm text-yellow-600">Basic info only</td>
                            <td class="px-4 py-2 text-sm text-yellow-600">Restricted topics</td>
                            <td class="px-4 py-2 text-sm text-red-600">No</td>
                            <td class="px-4 py-2 text-sm text-red-600">No</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Consent Management Section -->
              <div id="consent" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Consent Management System</h2>
                </div>
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Initial Consent Process</h4>
                    <div class="grid md:grid-cols-3 gap-6">
                      <div class="bg-blue-50 rounded-lg p-4">
                        <h5 class="font-medium text-blue-900 mb-2">Step 1: Data Collection Consent</h5>
                        <ul class="space-y-1 text-sm text-blue-800">
                          <li>☐ Text messages and communications</li>
                          <li>☐ Voice recordings and phone calls</li>
                          <li>☐ Photos and video content</li>
                          <li>☐ Social media posts and interactions</li>
                          <li>☐ Written documents and notes</li>
                        </ul>
                      </div>
                      <div class="bg-purple-50 rounded-lg p-4">
                        <h5 class="font-medium text-purple-900 mb-2">Step 2: Processing Consent</h5>
                        <ul class="space-y-1 text-sm text-purple-800">
                          <li>☐ Personality trait analysis</li>
                          <li>☐ Communication style modeling</li>
                          <li>☐ Voice pattern extraction</li>
                          <li>☐ Facial expression analysis</li>
                          <li>☐ Behavioral pattern recognition</li>
                        </ul>
                      </div>
                      <div class="bg-green-50 rounded-lg p-4">
                        <h5 class="font-medium text-green-900 mb-2">Step 3: Usage Consent</h5>
                        <ul class="space-y-1 text-sm text-green-800">
                          <li>☐ Family member interactions</li>
                          <li>☐ Automated responses to messages</li>
                          <li>☐ Voice synthesis capabilities</li>
                          <li>☐ Video avatar generation</li>
                          <li>☐ Public memorial features</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Your Rights Section -->
              <div id="rights" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Your Rights and Protections</h2>
                </div>
                <div class="space-y-6">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Data Subject Rights (GDPR Compliant)</h4>
                    <div class="grid md:grid-cols-2 gap-4">
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h5 class="font-medium text-gray-900">Right to Access</h5>
                          <p class="text-sm text-gray-600">Complete data export in standard formats</p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h5 class="font-medium text-gray-900">Right to Rectification</h5>
                          <p class="text-sm text-gray-600">Correct inaccurate personal data</p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h5 class="font-medium text-gray-900">Right to Erasure</h5>
                          <p class="text-sm text-gray-600">Complete data deletion ("right to be forgotten")</p>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h5 class="font-medium text-gray-900">Right to Portability</h5>
                          <p class="text-sm text-gray-600">Transfer data to other services</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Compliance Section -->
              <div id="compliance" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Compliance and Legal Framework</h2>
                </div>
                <div class="space-y-6">
                  <div class="grid md:grid-cols-3 gap-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                      <h4 class="font-semibold text-blue-900 mb-2">International Privacy Laws</h4>
                      <ul class="space-y-1 text-sm text-blue-800">
                        <li>• GDPR Compliance (EU)</li>
                        <li>• CCPA Compliance (California)</li>
                        <li>• PIPEDA Compliance (Canada)</li>
                        <li>• Local Regulations</li>
                      </ul>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4">
                      <h4 class="font-semibold text-purple-900 mb-2">Industry Standards</h4>
                      <ul class="space-y-1 text-sm text-purple-800">
                        <li>• ISO 27001 Certification</li>
                        <li>• SOC 2 Type II Audits</li>
                        <li>• Privacy by Design</li>
                        <li>• Ethical AI Standards</li>
                      </ul>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                      <h4 class="font-semibold text-green-900 mb-2">Legal Protections</h4>
                      <ul class="space-y-1 text-sm text-green-800">
                        <li>• Terms of Service</li>
                        <li>• Privacy Policy</li>
                        <li>• Digital Estate Planning</li>
                        <li>• Liability Limitations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Section -->
              <div id="contact" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                  <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">Contact and Support</h2>
                </div>
                <div class="space-y-6">
                  <div class="grid md:grid-cols-3 gap-6">
                    <div class="bg-blue-50 rounded-lg p-6 text-center">
                      <svg class="w-8 h-8 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <h4 class="font-semibold text-blue-900 mb-2">Privacy Officer</h4>
                      <p class="text-sm text-blue-800 mb-2">privacy@digitalsoulapp.ch</p>
                      <p class="text-xs text-blue-700">Response Time: 48 hours</p>
                    </div>
                    
                    <div class="bg-purple-50 rounded-lg p-6 text-center">
                      <svg class="w-8 h-8 text-purple-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      <h4 class="font-semibold text-purple-900 mb-2">Ethics Committee</h4>
                      <p class="text-sm text-purple-800 mb-2">ethics@digitalsoulapp.ch</p>
                      <p class="text-xs text-purple-700">Response Time: 72 hours</p>
                    </div>
                    
                    <div class="bg-red-50 rounded-lg p-6 text-center">
                      <svg class="w-8 h-8 text-red-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <h4 class="font-semibold text-red-900 mb-2">Emergency Support</h4>
                      <p class="text-sm text-red-800 mb-2">1-800-DIGITAL-SOUL</p>
                      <p class="text-xs text-red-700">24/7 Crisis Support</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="mt-12 bg-purple-50 rounded-2xl p-8 text-center">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                  Document Updates
                </h3>
                <p class="text-gray-600 mb-4">
                  This Privacy Policy is reviewed and updated quarterly to ensure continued compliance 
                  with evolving privacy laws, ethical standards, and user needs.
                </p>
                <p class="text-sm text-gray-500">
                  Last updated: January 2024 • Next review: April 2024
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
      privacyWindow.document.close();
    }
  };

  return (
    <section id="trust" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-900/30 rounded-full px-6 py-3 mb-6">
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">Built with Ethical AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trust Is
            <br />
            <span className="text-purple-400">Our Foundation</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            We understand you're entrusting us with your most precious memories. 
            Here's how we protect and honor that trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-purple-900/30 text-purple-400 mb-4 group-hover:bg-purple-800/40 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h3 class="text-3xl font-bold text-center mb-8">
              Our Privacy Principles
            </h3>
            <div className="space-y-4">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-300 text-lg">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Questions about privacy or security?
          </p>
          <button 
            onClick={openPrivacyPolicy}
            className="text-purple-400 hover:text-purple-300 font-medium underline underline-offset-4 transition-colors"
          >
            Read our full Privacy Policy
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trust;