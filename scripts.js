const container = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-prev-btn');
const nextBtn = document.querySelector('.carousel-next-btn');

let scrollAmount = 0;
const scrollStep = 300;
const scrollIntervalTime = 2000; 
let scrollInterval = null;

function scrollToNext() {
  scrollAmount = Math.min(scrollAmount + scrollStep, container.scrollWidth - container.clientWidth);
  container.style.transform = `translateX(-${scrollAmount}px)`;
}


prevBtn.addEventListener('click', () => {
  scrollAmount = Math.max(scrollAmount - scrollStep, 0);
  container.style.transform = `translateX(-${scrollAmount}px)`;
});

nextBtn.addEventListener('click', () => {
  scrollToNext();
});

function startAutoScroll() {
  scrollInterval = setInterval(() => {
    scrollToNext();
  }, scrollIntervalTime);
}

function stopAutoScroll() {
  clearInterval(scrollInterval);
}

startAutoScroll();

container.addEventListener('mouseenter', () => {
  stopAutoScroll();
});

container.addEventListener('mouseleave', () => {
  startAutoScroll();
});
