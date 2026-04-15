const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    contents[index].classList.add('active');
  });
});
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

if (hamburger) {
  hamburger.onclick = () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
  };
}

if (closeMenu) {
  closeMenu.onclick = () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  };
}

if (overlay) {
  overlay.onclick = () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  };
}
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let current = 0;

function showSlide(newIndex) {
  const currentSlide = slides[current];
  const nextSlide = slides[newIndex];

  currentSlide.classList.remove('active');
  currentSlide.classList.add('prev');

  nextSlide.classList.add('active');

  setTimeout(() => {
    currentSlide.classList.remove('prev');
  }, 600);

  dots.forEach(dot => dot.classList.remove('active'));
  dots[newIndex].classList.add('active');

  current = newIndex;
}

nextBtn.onclick = () => {
  let i = (current + 1) % slides.length;
  showSlide(i);
};

prevBtn.onclick = () => {
  let i = (current - 1 + slides.length) % slides.length;
  showSlide(i);
};

dots.forEach((dot, index) => {
  dot.onclick = () => showSlide(index);
});

setInterval(() => {
  nextBtn.click();
}, 5000);
// =======================
// PRO FLASH SALE COUNTDOWN
// =======================

function getEndOfDay() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end;
}

let endDate = localStorage.getItem("flashEnd");

if (!endDate) {
  endDate = getEndOfDay().getTime();
  localStorage.setItem("flashEnd", endDate);
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    localStorage.removeItem("flashEnd");
    document.querySelector(".countdown").innerHTML = "ĐÃ KẾT THÚC";
    return;
  }

  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");

  // Nhấp nháy khi còn dưới 10 phút
  if (distance < 600000) {
    document.querySelector(".countdown").style.animation = "blink 1s infinite";
  }
}

function changeImage(element) {
  const mainImage = document.getElementById("mainImage");

  // fade out
  mainImage.style.opacity = 0;

  setTimeout(() => {
    mainImage.src = element.src;
    mainImage.style.opacity = 1;
    mainImage.style.transform = "scale(1.02)";

    setTimeout(() => {
      mainImage.style.transform = "scale(1)";
    }, 200);
  }, 150);

  // remove active cũ
  document.querySelectorAll(".thumb").forEach(img => {
    img.classList.remove("active");
  });

  // add active mới
  element.classList.add("active");
};

