const searchInput = document.getElementById("searchInput");
const reloadButton = document.getElementById("reloadButton");
const postsContainer = document.getElementById("postsContainer");
const statusMessage = document.getElementById("status-message");

let allPosts = [];

async function fetchPosts() {
    try {
        statusMessage.textContent = "Loading posts...";
        statusMessage.className = "";
        reloadButton.disabled = true;

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        allPosts = await response.json();

        displayPosts(allPosts);

        statusMessage.textContent =
            `Successfully loaded ${allPosts.length} posts.`;

    } catch (error) {
        statusMessage.textContent =
            "Something went wrong. Please try again.";

        statusMessage.className = "error";

        console.error(error);

    } finally {
        reloadButton.disabled = false;
    }
}

function displayPosts(posts) {
    postsContainer.innerHTML = "";

    if (posts.length === 0) {
        postsContainer.textContent = "No posts found.";
        return;
    }

    posts.forEach(function(post) {
        const postCard = document.createElement("article");
        postCard.className = "post-card";

        const postNumber = document.createElement("span");
        postNumber.className = "post-number";
        postNumber.textContent = `Post #${post.id}`;

        const title = document.createElement("h2");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.textContent = post.body;

        postCard.appendChild(postNumber);
        postCard.appendChild(title);
        postCard.appendChild(body);

        postsContainer.appendChild(postCard);
    });
}

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredPosts = allPosts.filter(function(post) {
        return (
            post.title.toLowerCase().includes(searchText) ||
            post.body.toLowerCase().includes(searchText)
        );
    });

    displayPosts(filteredPosts);

    statusMessage.textContent =
        `Showing ${filteredPosts.length} posts.`;
});

reloadButton.addEventListener("click", function() {
    fetchPosts();
});

fetchPosts();