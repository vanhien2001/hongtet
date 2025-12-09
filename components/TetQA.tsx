import React, { useState } from 'react';
import { TET_QA } from '../constants';

const TetQA: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative py-20 overflow-hidden bg-gray-50">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-orange-50/30 to-gray-50"></div>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-tetRed/8 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-white rounded-full text-tetRed font-semibold text-sm border-2 border-tetRed/20 shadow-sm">
              ĐẶC BIỆT
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Tìm Hiểu Về Tết Nguyên Đán
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
            Khám phá những điều thú vị về dịp lễ lớn nhất trong năm của người Việt
          </p>
        </div>

        {/* Q&A Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {TET_QA.map((qa, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:border-tetRed/30 transition-all duration-500 overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 text-left flex items-start gap-4 hover:bg-red-50/50 transition-all duration-300"
              >
                {/* Question Number Circle */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-tetRed to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg pr-4 group-hover:text-tetRed transition-colors leading-snug">
                    {qa.question}
                  </h3>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transform transition-all duration-300 ${
                    openIndex === index ? 'rotate-180 bg-red-100' : ''
                  }`}>
                    <svg
                      className="w-5 h-5 text-tetRed"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 pt-2">
                  <div className="pl-14 pr-4">
                    <div className="relative">
                      {/* Decorative line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-tetRed via-orange-400 to-orange-300 rounded-full"></div>
                      <p className="pl-6 text-gray-800 leading-relaxed text-base">
                        {qa.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 font-medium">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-tetRed/30"></div>
            <span>Chúc mừng năm mới</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-tetRed/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetQA;
