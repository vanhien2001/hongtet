import React, { useState } from "react";
import Navigation from "./components/Navigation";
import HeroCountdown from "./components/HeroCountdown";
import TetQA from "./components/TetQA";
import EventCard from "./components/EventCard";
import EventModal from "./components/EventModal";
import FoodGrid from "./components/FoodGrid";
import { EVENTS } from "./constants";
import { Tab, Event } from "./types";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;

    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }

    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleCardClick = (event: Event) => {
    if (!hasMoved) {
      setSelectedEvent(event);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return (
          <>
            <HeroCountdown />

            <div className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-red-50/80 via-orange-50/70 to-yellow-50/80">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 via-orange-100/30 to-yellow-100/40 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-200/20 via-orange-100/10 to-transparent pointer-events-none"></div>
              <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-yellow-300/15 rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-red-300/15 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

              <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                    Sự kiện sắp tới
                  </h2>
                  <p className="text-gray-700 mt-2 text-base md:text-lg font-medium">
                    Đừng bỏ lỡ những khoảnh khắc đáng nhớ trong năm.
                  </p>
                </div>
                <div className="hidden md:flex space-x-2">
                  <button
                    onClick={() => scroll("left")}
                    className="w-11 h-11 rounded-full border-2 border-red-300 bg-white flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-md hover:shadow-lg"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="w-11 h-11 rounded-full border-2 border-red-600 bg-red-600 flex items-center justify-center text-white hover:bg-red-700 hover:border-red-700 transition-all shadow-md hover:shadow-lg"
                  >
                    →
                  </button>
                </div>
                </div>
              </div>

              {/* Slider Container with Scroll Snap */}
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  ref={sliderRef}
                  className={`flex overflow-x-scroll gap-6 pb-4 snap-x snap-mandatory select-none ${
                  isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
                }`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#D9381E #f3f4f6",
                  scrollBehavior: isDragging ? "auto" : "smooth",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {EVENTS.map((event) => (
                  <div key={event.id} className="snap-center">
                    <EventCard event={event} onClick={handleCardClick} />
                  </div>
                ))}
                {/* Spacer for right padding */}
                <div className="w-4 shrink-0"></div>
              </div>

                {/* Scroll indicator text */}
                <div className="text-center text-sm text-gray-600 mt-4 font-medium">
                  ← Kéo hoặc cuộn để xem thêm →
                </div>
              </div>
            </div>

            {/* Tết Q&A Section */}
            <div id="tet-qa-section">
              <TetQA />
            </div>
          </>
        );
      case Tab.FOOD:
        return <FoodGrid />;
      case Tab.ABOUT:
        return (
          <div className="max-w-[1000px] mx-auto px-4 py-20 text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-red-100 text-tetRed rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                Về Hóng Tết
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                "Hóng Tết" là dự án nhỏ được tạo ra với mong muốn kết nối mọi
                người với những giá trị văn hóa truyền thống của Việt Nam. Mình
                tin rằng, mỗi sự kiện, mỗi ngày lễ đều mang trong mình một câu
                chuyện đẹp đẽ cần được kể lại.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Website được thiết kế tối giản để bạn tập trung vào điều quan
                trọng nhất:{" "}
                <span className="font-semibold text-tetRed">
                  Thời gian bên gia đình và những người thân yêu.
                </span>
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans pb-10">
      <div className="relative pt-4 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <main className="animate-fade-in">{renderContent()}</main>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <footer className="text-center py-8 px-4">
        <p className="text-gray-400 text-sm mb-2">© 2025 Hóng Tết. Made with ❤️ for Vietnam.</p>
        <p className="text-gray-400 text-xs">
          Thời gian hiển thị theo múi giờ Việt Nam (GMT+7)
        </p>
      </footer>
    </div>
  );
};

export default App;
