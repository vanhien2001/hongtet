import React from 'react';
import { Food } from '../types';
import { FOODS } from '../constants';

const FoodGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Ẩm Thực Ngày Tết</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Những món ăn truyền thống không chỉ mang hương vị quê hương mà còn chứa đựng những ý nghĩa sâu sắc về sự may mắn và đoàn viên.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FOODS.map((food) => (
          <div key={food.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{food.name}</h3>
              <p className="text-tetRed text-xs font-bold uppercase tracking-wide mb-3">{food.description}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{food.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGrid;