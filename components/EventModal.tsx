import React, { useState, useEffect } from 'react';
import { Event, QnA } from '../types';
import { generateEventDetails } from '../services/geminiService';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

const AccordionItem: React.FC<{ qa: QnA; isOpen: boolean; onClick: () => void }> = ({ qa, isOpen, onClick }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button 
      className="w-full text-left py-4 flex justify-between items-center focus:outline-none group"
      onClick={onClick}
    >
      <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-tetRed' : 'text-gray-800 group-hover:text-tetRed'}`}>
        {qa.question}
      </span>
      <span className={`transform transition-transform duration-300 text-gray-600 ${isOpen ? 'rotate-180' : ''}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{qa.answer}</p>
    </div>
  </div>
);

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (event) {
      setOpenIndex(0);
    }
  }, [event]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [event]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-float" style={{ animation: 'none' }}>
        {/* Header Image */}
        <div className="h-48 md:h-64 relative shrink-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="absolute bottom-6 left-6 md:left-8 text-white">
            <div className="flex items-center space-x-2 text-sm md:text-base font-medium opacity-90 mb-1">
              <span className="bg-tetRed px-2 py-0.5 rounded text-white">{event.category}</span>
              <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">{event.title}</h2>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed font-light">
            {event.fullDescription}
          </p>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">Thông tin chi tiết</h3>
            {event.qa.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                qa={item} 
                isOpen={openIndex === idx} 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;