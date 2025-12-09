import React, { useMemo } from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const daysLeft = useMemo(() => {
    const now = new Date().getTime();
    const eventDate = new Date(event.date).getTime();
    const diff = eventDate - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [event.date]);

  const isUrgent = daysLeft < 7 && daysLeft > 0;
  
  return (
    <div 
      className="group relative flex-shrink-0 w-80 md:w-96 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-[450px]"
      onClick={() => onClick(event)}
    >
      {/* 1. Visual Header (45%) */}
      <div className="h-[45%] w-full relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {event.category}
        </span>
      </div>

      {/* 2. Body Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date Section */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4 text-tetRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span className="font-semibold text-gray-700">
            {new Date(event.date).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })}
          </span>
          {event.lunarDate && (
            <span className="text-gray-400 text-xs border-l border-gray-300 pl-2">
              (Âm: {event.lunarDate})
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-tetRed transition-colors">
          {event.title}
        </h3>

        {/* Teaser Text */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed flex-grow">
          {event.description}
        </p>
      </div>

      {/* 3. Footer / Status & CTA */}
      <div className="px-6 pb-6 pt-0 mt-auto flex items-center justify-between">
        {/* Countdown Pill */}
        <div className={`
          flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm
          ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}
        `}>
          <span className="relative flex h-2 w-2 mr-1">
             {isUrgent && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isUrgent ? 'bg-red-500' : 'bg-green-500'}`}></span>
          </span>
          <span>{daysLeft > 0 ? `Còn ${daysLeft} ngày` : 'Đã diễn ra'}</span>
        </div>

        {/* CTA */}
        <div className="flex items-center text-tetRed font-semibold text-sm opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Xem chi tiết
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EventCard);