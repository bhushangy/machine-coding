import { useEffect, useState } from 'react';
import './App.css';

const Carousel = ({ images, wait }: { images: number[]; wait: number }) => {
  const [index, setIndex] = useState(0);
  const [infiniteScroll, setInfiniteScroll] = useState(false);

  useEffect(() => {
    if (!infiniteScroll && index === images.length - 1) {
      return;
    }
    const timerId = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, wait);

    return () => clearTimeout(timerId);
  }, [images.length, wait, index, infiniteScroll]);

  return (
    <div className="container">
      <div>
        <div className="carousel">
          <h1>{images[index]}</h1>
        </div>
        <div className="buttonsContainer">
          <button
            disabled={!infiniteScroll && index === 0}
            onClick={() => {
              if (!infiniteScroll && index === 0) {
                return;
              }
              setIndex(
                (prevIndex) => (prevIndex - 1 + images.length) % images.length
              );
            }}
          >
            prev
          </button>
          <button
            disabled={!infiniteScroll && index === images.length - 1}
            onClick={() => {
              if (!infiniteScroll && index === images.length - 1) {
                return;
              }
              setIndex((prevIndex) => (prevIndex + 1) % images.length);
            }}
          >
            next
          </button>
        </div>
        <div style={{ display: 'flex', marginTop: '2rem', gap: '1rem' }}>
          <input
            type="checkbox"
            id="infiniteScroll"
            checked={infiniteScroll}
            onChange={() => setInfiniteScroll((prevValue) => !prevValue)}
          />
          <label htmlFor="infiniteScroll">Infinite scroll</label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
