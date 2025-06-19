document.addEventListener('DOMContentLoaded', function() {
    const mainNewsContainer = document.querySelector('.main-news');
    const carouselContainer = document.querySelector('.tank-carousel');
    const newsGridContainer = document.querySelector('.news-grid');
    
    fetch('https://raw.githubusercontent.com/nirtothunder/space_blitz_web/refs/heads/main/api/news.json')
        .then(response => response.json())
        .then(data => {
            renderMainNews(data.main_news);
            renderCarousel(data.carousel);
            renderNewsGrid(data.news);
            initCarousel();
            initEventListeners();
        })
        .catch(error => {
            console.error('Ошибка загрузки данных:', error);
        });
    function renderMainNews(newsData) {
        mainNewsContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${newsData.image}')`;
        
        const newsContent = mainNewsContainer.querySelector('.news-content');
        newsContent.querySelector('.news-title').textContent = newsData.title;
        newsContent.querySelector('p').textContent = newsData.description;
    }
    function renderCarousel(carouselData) {
        carouselContainer.innerHTML = '';
        
        carouselData.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = `tank-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
            `;
            carouselContainer.appendChild(slide);
        });
    }
    function renderNewsGrid(newsData) {
        newsGridContainer.innerHTML = '';
        
        newsData.forEach(item => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="news-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            newsGridContainer.appendChild(card);
        });
    }
    function initCarousel() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.tank-slide');
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        setInterval(nextSlide, 5000);
    }
  
    function initEventListeners() {
        document.querySelector('.login-btn').addEventListener('click', () => {
            alert('Не удалось войти в аккаунт!');
        });
        
        const newsCards = document.querySelectorAll('.news-card');
        newsCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'transform 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
});
