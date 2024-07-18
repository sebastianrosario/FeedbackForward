// Grab elements

localStorage.setItem("serverIp", "http://192.168.28.129:3000");
const serverIp = localStorage.getItem("serverIp");

const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);  
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
    const newPostButton = document.getElementById('New Post');
    
    newPostButton.onclick = function() {
        window.location.href = 'newpost.html';
    };

        /***Used for testing the payload contents***/
    //fetch('http://192.168.28.129:3000/api/posts/${currentPost}', { // Change to actual variable
    console.log("loading")
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);

    fetch(`${serverIp}/api/posts/filter/twohoursago`, { // Change to actual variable
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('key')
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const container = document.getElementById('container');
        if (!container) {
            console.error('Posts container not found');
            return;
        }
    
        // Clear existing content
        container.innerHTML = '';
    
        data.message.forEach(post => {
            // Create elements
            const postElement = document.createElement('div');
            postElement.classList.add('post');
    
            const titleElement = document.createElement('h2');
            titleElement.textContent = post.title;
    
            const contentElement = document.createElement('p');
            contentElement.textContent = post.content;
    
            const tagsElement = document.createElement('div');
            tagsElement.classList.add('tags');
            post.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.textContent = tag;
                tagsElement.appendChild(tagElement);
            });
    
            const authorElement = document.createElement('p');
            authorElement.textContent = `Posted by ${post.username}`;
    
            // Append elements to post container
            postElement.appendChild(titleElement);
            postElement.appendChild(contentElement);
            postElement.appendChild(tagsElement);
            postElement.appendChild(authorElement);
    
            container.appendChild(postElement);
        });
        // console.log(data.postId);
        // document.getElementById("title").innerHTML = data.message.title;
        // document.getElementById("content").innerHTML = data.message.content;
        // document.getElementById("tags").innerHTML = data.message.tags;
        //const title = data.message.title
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Post Fetch Failed');
    });

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
// const themeToggleBtn = selectElement('#theme-toggle-btn');
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

// post.onclick = function() {
//     window.location.href = "newpage.html";
// }