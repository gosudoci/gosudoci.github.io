import { useState } from 'react';
import { galleryCategories as categories, galleryItems } from '@/data/projects';
import type { GalleryItem } from '@/data/projects';
import Img from '@/components/base/Img';
import GalleryModal from './GalleryModal';
import GridLines from '@/components/base/GridLines';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.classList.remove('modal-open');
  };

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-white" aria-label="Detail Page Gallery">
      <GridLines />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Section heading */}
        <div className="mb-14 md:mb-20">
          <h2 className="reveal reveal-mask font-montserrat font-light text-app-black leading-[0.95] tracking-[-0.04em] text-[12vw] md:text-[clamp(3.5rem,8vw,7.5rem)]">
            <span className="mask"><span>Personal Works</span></span>
          </h2>
          <div className="reveal reveal-delay-1 mt-6 md:mt-8 max-w-xl">
            <p className="text-sm md:text-base font-medium text-app-black mb-4">
              개인 작업
            </p>
            <p className="text-base text-app-gray max-w-lg leading-relaxed">
              브랜드의 가치를 높이는 이커머스 상세페이지 디자인 작업물입니다.
            </p>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="reveal reveal-delay-1 flex flex-wrap gap-2 mb-10 md:mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-pill px-4 py-2 rounded-full text-sm font-medium transition duration-300 cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-app-black text-white'
                  : 'bg-app-light text-app-gray hover:text-app-black hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="reveal reveal-delay-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[2px]">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item reveal-delay-${(index % 6) + 3}`}
              onClick={() => openModal(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') openModal(item);
              }}
              aria-label={`View ${item.title} by ${item.brand}`}
            >
              <Img
                src={item.thumbnail}
                alt={`${item.title} - ${item.brand} 상세페이지 디자인 썸네일`}
                title={`${item.title} - ${item.brand}`}
                className="block w-full h-auto object-cover"
              />
              {/* Hover overlay */}
              <div className="dim-overlay">
                <div className="overlay-content text-center px-4">
                  <p className="text-white text-sm md:text-base font-medium mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/70 text-xs mb-1">{item.brand}</p>
                  <p className="text-white/80 text-xs font-montserrat">
                    {item.pixelSize}
                  </p>
                  <p className="text-white/80 text-xs mt-0.5">
                    기여도 : 개인 100%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Item count */}
        <p className="reveal reveal-delay-3 mt-8 text-sm text-app-gray font-montserrat">
          {filteredItems.length} projects
        </p>
      </div>

      {/* Modal */}
      {selectedItem && (
        <GalleryModal item={selectedItem} onClose={closeModal} />
      )}
    </section>
  );
}