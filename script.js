/* General Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Main Container */
.main-container {
    display: flex;
    width: 90%;
    max-width: 1200px;
    height: 85%;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    overflow: hidden;
}

/* Left Container (60% width) */
.left-container {
    flex: 0 0 60%;  /* 60% width */
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    overflow-y: auto;
}

.editable-block {
    background-color: #ffd700; /* Light mustard */
    color: #000;
    border: none;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    height: 100px;  /* Adjust block height */
}

.editable-block:hover {
    background-color: #ffcc33; /* Darker mustard on hover */
}

/* Right Container (40% width) */
.right-container {
    flex: 0 0 40%; /* 40% width */
    background-color: #ff69b4;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
}

/* Hero Banner */
.hero-banner {
    width: 100%;
    height: 10%; /* 10% height */
    text-align: center;
}

.hero-banner h1 {
    font-size: 2.2em;
    color: white;
}

/* Hero Image */
.hero-image {
    width: 100%;
    height: 80%; /* 80% height */
    background-image: url('https://via.placeholder.com/500x800'); /* Placeholder image */
    background-size: cover;
    background-position: center;
    border-radius: 8px;
}

/* Authentication Section */
.auth-section {
    width: 100%;
    height: 10%; /* 10% height */
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.auth-btn {
    background-color: #ffd700; /* Light mustard */
    color: #000;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
}

.auth-btn:hover {
    background-color: #ffcc33; /* Darker mustard on hover */
}

/* Footer */
footer {
    width: 100%;
    text-align: center;
    background-color: #000;
    color: #fff;
    padding: 15px;
    font-size: 1em;
}
