import React from 'react';
import Paragraph from '../reusable-components/Paragraph';
import AnimatedText from '../reusable-components/AnimatedText';
import Heading from '../reusable-components/Heading';

const termsData = [
  {
    title: '1. Eligibility for Partnership',
    points: [
      'a. The Service Provider will treat all information provided by the Client as confidential and will not disclose it to third parties without the Client\'s explicit consent.',
      'b. The Client agrees that the final logo design, once delivered, is no longer considered confidential.',
    ],
  },
  {
    title: '2. Service Engagement',
    points: [
      'a. Services will be delivered based on the scope, timeline, and pricing agreed upon in the official proposal or contract.',
      'b. Any change or addition in the project scope must be communicated in writing and will require an updated quotation.',
    ],
  },
  {
    title: '3. Payment Terms',
    points: [
      'a. 50% of the total project cost must be paid in advance before the work begins.',
      'b. The remaining 50% must be cleared before final delivery.',
    ],
  },
  {
    title: '4. Confidentiality & Non-Disclosure',
    points: [
      'a. Both parties agree to maintain strict confidentiality of all shared data, business strategies, and project content.',
      'b. Information shared during the partnership shall not be disclosed to any third party without written consent.',
    ],
  },
];


const TermsAndConditions = () => {
  return (
    <div className="w-full bg-[#0F0F10]">
      <div className="mx-auto max-w-[1280px] text-white flex flex-col lg:flex-row px-4 sm:px-6 py-8">
        {/* Left Side Label - Moves to top on mobile */}
        <div className="w-full lg:w-1/5 flex items-start justify-start mb-6 lg:mb-0">
          <Paragraph className="text-lg sm:text-xl pt-0 lg:pt-8">B2B Partnership</Paragraph>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-4/5 p-4 sm:p-6 lg:p-8">
          <AnimatedText
            text='Terms & Conditions for B2B Partnership'
            loop={false}
            className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10"
          />

          <div className="space-y-4 sm:space-y-6">
            {termsData.map((section, index) => (
              <div
                key={index}
                className="border border-[#2D2D30] p-4 sm:p-6 rounded-lg">
                <Heading className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{section.title}</Heading>
                {section.points.map((point, idx) => (
                  <p
                    key={idx}
                    className={`text-xs sm:text-sm text-gray-300 ${idx !== section.points.length - 1 ? 'mb-1 sm:mb-2' : ''
                      }`}
                  >
                    {point}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 sm:mt-10">
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
            >
              See More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;