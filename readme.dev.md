# Development Plan for Allama: A Knowledge Base PWA

1. Project Setup

- Tools: Use Vite for bundling and ReactJS for the front-end framework.
- State Management: Utilize React's Context API to manage global state.
- ReactJS Libraries to Use
  - react: Core library for building the user interface.
  - react-dom: DOM-specific methods for React.
  - react-router-dom: For handling routing within the application.
  - axios: For making HTTP requests (optional if fetch is preferred).
  - fuse.js: For implementing search functionality.
  - react-markdown: For rendering markdown content with HTML support.
  - dompurify: To sanitize HTML content.
- Project Folder Structure

```
   my-pwa-blog/
   │
   ├── public/
   │ ├── data/
   │ │ ├── categories.json
   │ │ ├── tags.json
   │ │ └── posts/
   │ │  ├── category1-slug.json
   │ │  ├── category2-slug.json
   │ │  └── category3-slug.json
   │ ├── index.html
   │ └── service-worker.js
   │
   ├── src/
   │ ├── elements/
   │ │ ├── common/
   │ │ │ ├── LoadingIndicator.js
   │ │ │ ├── SidebarNavigation.js
   │ │ │ ├── Breadcrumb.js
   │ │ │ └── Pagination.js
   │ │ └── pages/
   │ │   ├── CategoryList.js
   │ │   ├── PostFeatured.js
   │ │   ├── PostLatest.js
   │ │   ├── PostRelated.js
   │ │   ├── PostTags.js
   │ │   └── PostTags.js
   │ ├── contexts/
   │ │ ├── DataContext.js
   │ │ └── ConfigContext.js
   │ ├── hooks/
   │ │ └── useFetch.js
   │ ├── pages/
   │ │ ├── ErrorPage.js
   │ │ ├── HomePage.js
   │ │ ├── CategoryPage.js
   │ │ └── PostPage.js
   │ ├── styles/
   │ │ └── main.css
   │ ├── utils/
   │ │ ├── markdownParser.js
   │ │ └── search.js
   │ ├── config.js
   │ ├── App.js
   │ ├── Router.js
   │ ├── ErrorBoundary.js
   │ └── index.js
   │
   ├── .gitignore
   ├── package.json
   └── README.md
```

2. Routing

- React Router: Implement routing to handle navigation between the main blog page, category pages, and individual post pages.
- Handling error-boundary and show the error page

3. Context Implementation

- Ease of Access: Allow components to easily access and consume global state data without prop drilling.
- DataContext: Create a DataContext to manage posts, categories, and tags centrally.
- ConfigContext: Create a ConfigContext to manage app configuration and settings.
- Store initial app configuration in a JavaScript file (config.js).
  Structure includes config for app configuration and settings for future user settings, example:

```
{
  name: "Allama",
  codeName: "allama",
  tagline: "Khairukum man ta'allamal Quraana wa'allamahu (HR. Bukhari)",
  version: "1.0.0",
  settings: {
    theme: "auto", // dark, light, auto
    splashScreenDelay: 1000, // milliseconds
    limitPerPage: 10,
    fontSize:'14px';
  },
  dataApi: {
    baseUrl: process.env.NODE_ENV === "development" ? "https://localhost:5173" : "https://example.com",
    categories: "/data/categories.json",
    posts: "/data/posts/", // auto fetch from the categories.json result - format categorySlug.json
    tags: "/data/tags.json"
  },
}
```

4. Data Structure

- Categories: Store categories in a JSON file (categories.json) with each category having a unique id, unique slug and name.
- Tags: Store tags in a JSON file (tags.json) with each tag having a unique id, unique slug and name.
- Posts: Store posts in a JSON file (posts.json) with each post having a composite ID (categoryId and postId), unique slug, title, description (markdown allowing HTML), content (markdown allowing HTML), and tags (array of tag IDs).

5. Fetching Data

- Consistency: Use fetch API to load local JSON files for posts, categories, and tags, ensuring a consistent approach for future scalability.
- Handling Updates: Implement logic in the service worker to check and apply updates to cached data and notify users of new content.

8. Handling HTML and Markdown Content

- Markdown Parser: Use a library like marked or react-markdown to parse markdown content, allowing HTML tags with classes and styles for granular control.
- Sanitization: Use libraries like DOMPurify to sanitize HTML content in posts to prevent XSS attacks.

6. Components

- Splash Screen: Implement a splash screen that displays while the app initially loads to enhance user experience.
- Home: Display category and tags list.
- Category List: Display a list of categories, each linking to a filtered list of posts.
- Post List: Display a list of posts filtered by category or tag.
- Full Post Page: Render a full post with its title, content, and associated tags, ensuring content supports HTML and markdown with styling and classes.

7. Service Worker for PWA

- Registration: Register the service worker to handle caching and updates.
- Offline Support: Implement caching strategies to serve content when the user is offline.
- Lifecycle Management: Handle installation, activation, and fetch events to manage cache and serve resources efficiently.
- Update Notifications: Implement logic to check for updates and notify users to refresh the app.
- Splash Screen for initial loading and Loading Screens during data fetching to prevent interruptions and enhance user experience. This can be a simple overlay that indicates data is being loaded or updated.

9. Search Capabilities

- Fuse.js: Implement search functionality using Fuse.js, a lightweight fuzzy-search library that can efficiently search through JSON data structures.

## Summary

This development plan outlines the steps to build a PWA blog using Vite and ReactJS, with efficient data management, centralized state handling, and service worker-based updates. The plan includes context implementation for data and configuration, handling HTML and markdown content, search capabilities using Fuse.js, a splash screen for initial loading, a loading screen during data fetching, and a suggested project folder structure for organized development.
