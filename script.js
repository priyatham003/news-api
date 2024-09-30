const apiUrl = 'news.json'; 
const fetchNewsBtn = document.getElementById('fetchNewsBtn');
const newsContainer = document.getElementById('newsContainer');
let articles = [];

// Fetch news articles
async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check if articles are available in the response
        if (!data.articles || data.articles.length === 0) {
            throw new Error('No articles found in the response.');
        }
        
        console.log("Fetched articles:", data.articles);
        articles = data.articles;
        renderRandomArticle(); // Render a random article
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error fetching articles. Please try again later.</p>';
    }
}

// Render a random article from the fetched articles
function renderRandomArticle() {
    newsContainer.innerHTML = ''; // Clear the container
    if (articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length); // Pick a random article
        const article = articles[randomIndex];
        
        // Create the article element with title, description, and image
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        articleElement.innerHTML = `
            <h2>${article.title || 'Untitled'}</h2>
            <p>${article.description || 'No description available.'}</p>
            <img src="${article.urlToImage || 'default-image.jpg'}" alt="${article.title || 'Article image'}" onerror="this.src='default-image.jpg';">
        `;
        
        // Open article link in a new tab when clicked
        articleElement.addEventListener('click', () => {
            if (article.url) {
                window.open(article.url, '_blank');
            }
        });
        
        // Append the article element to the news container
        newsContainer.appendChild(articleElement);
    } else {
        newsContainer.innerHTML = '<p>No articles available.</p>';
    }
}

// Attach the fetchNews function to the button click event
fetchNewsBtn.addEventListener('click', fetchNews);
