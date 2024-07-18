// Grab elements
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);  
};

window.onload = function () {
    fetch("http://192.168.28.129:3000/api/posts/669904ce46930466bd08029d",{
        method: "GET",
        headers:{
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGIzOGEyY2E3YjMwNTIxOWJhZDI3ZSIsInVzZXJuYW1lIjoidGVzdHRlc3R0ZXN0IiwiaWF0IjoxNzIxMzAyOTM2LCJleHAiOjE3MjEzMjA5MzZ9.TuvDe4St_wZVrujNAIKe7MXpJFpAShEzsQiGbE-DHAE"
        }
    })
    .then(response => response.json())
    .then(data => { 
        if (data.success) {
            const message = data.message;
            
            // Extract data from the JSON response
            const title = message.title;
            const category = message.tags.join(', '); // Combine tags into a single string
            const date = new Date(message.createdAt).toLocaleDateString(); // Format date

            // Update HTML elements with the fetched data
            document.querySelector('.article-category').textContent = category;
            document.querySelector('.article-date').textContent = date;
            document.querySelector('.article-title').textContent = title;
        } else {
            console.error('Failed to fetch article data.');
        }
    })
    .catch(error => {
        console.error('Error fetching article data:', error);
    });
};

//Nav styles on scroll
const scrollHeader = () =>{
    const navbarElement = selectElement('#header');
    if(this.scrollY >= 15) {
        navbarElement.classList.add('activated');
    } else {
        navbarElement.classList.remove('activated');
    }
}

window.addEventListener('scroll', scrollHeader);

// Open menu & search pop-up
const menuToggleIcon = selectElement('#menu-toggle-icon');
const formOpenBtn = selectElement('#search-icon');
const formCloseBtn = selectElement('#form-close-btn');
const searchContainer = selectElement('#search-form-container');

const toggleMenu = () =>{
    const mobileMenu = selectElement('#menu');
    mobileMenu.classList.toggle('activated');
    menuToggleIcon.classList.toggle('activated');
}

menuToggleIcon.addEventListener('click', toggleMenu);

document.addEventListener('DOMContentLoaded', function() {
    const newPostButton = document.getElementById('new Post');
    
    newPostButton.onclick = function() {
        window.location.href = 'newpost.html';
    };
});

// Open/Close search form popup
formOpenBtn.addEventListener('click', () => searchContainer.classList.add('activated'));
formCloseBtn.addEventListener('click', () => searchContainer.classList.remove('activated'));
// -- Close the search form popup on ESC keypress
window.addEventListener('keyup', (event) => {
    if(event.key === 'Escape') searchContainer.classList.remove('activated');
});

// Switch theme/add to local storage
const body = document.body;
const themeToggleBtn = selectElement('#theme-toggle-btn');
const currentTheme = localStorage.getItem('currentTheme');


// Swiper
const swiper = new Swiper(".swiper", {
    // How many slides to show
    slidesPerView: 1,
    // How much space between slides
    spaceBetween: 20,
    // Make the next and previous buttons work
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Make the pagination indicators work
    pagination: {
        el: '.swiper-pagination'
    },
    //Responsive breakpoints for how many slides to show at that view
    breakpoints: {
        // 700px and up shoes 2 slides
        700: {
          slidesPerView: 2
        },
        // 1200px and up shoes 3 slides
        1200: {
            slidesPerView: 3
        }
    }   
});

post.onclick = function() {
    window.location.href = "newpage.html";
}