# YouTube Clone

Welcome to the YouTube Clone project, a fully-featured video platform built with React and Vite. This application mirrors many of the functionalities found on YouTube, providing a seamless user experience for watching videos, searching, interacting with content, and more.

## Features

- **Google OAuth:** Secure authentication using Google OAuth for user login.
- **Watch Videos:** Users can view videos with a smooth and responsive player.
- **Video Gallery:** Browse through a collection of videos with detailed thumbnails and metadata.
- **Search Functionality:** Search for videos using keywords with advanced filters.
- **Voice Search:** Use voice commands to search for videos.
- **Like & Dislike:** Interact with videos by liking or disliking them.
- **Comment Section:** Engage in discussions by commenting on videos and liking/disliking comments.
- **Subscribe & Unsubscribe:** Manage your subscriptions to different channels.

## Installation

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/NemishGorasiya/YouTube-Clone.git
   cd YouTube-Clone
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Add .env file**
   Don't forget to add API keys in .env file<br />
   .sample.env is given for reference<br />
   You can find out API keys from <a href="https://console.cloud.google.com/">Google console</a>
4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Usage

Once the development server is running, you can view the application in your browser by navigating to `http://localhost:5173`.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web projects.
- **MUI:** A popular React UI framework that provides a comprehensive set of UI components that are customizable and follow Material Design guidelines.
- **Axios:** Simplifies making HTTP requests and handling responses.
- **React Hot Toast:** Delivers elegant and customizable toast notifications for user interactions.
- **Swiper:** Facilitates creating touch-friendly carousels and sliders, enhancing the user experience.
- **NProgress:** A library for showing progress bars on page loads and API requests.

## Data Source

All data displayed in this application comes from the **YouTube Data API v3**. This API allows us to retrieve information about YouTube videos, channels, playlists, and more, ensuring that the content is up-to-date and accurate.

## Disclaimer

This project is for **learning purposes only**. All credit for the content and data goes to **YouTube**. This project is not intended for commercial use and respects YouTube's terms and services.
