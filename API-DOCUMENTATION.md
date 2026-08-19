# 🎬 YouTube Backend API

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat-square&logo=jsonwebtokens)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![Postman](https://img.shields.io/badge/Tested%20with-Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

A complete **REST API backend** for a YouTube-style video platform, built with **Node.js, Express, and MongoDB**. It supports user authentication, video publishing, comments, playlists, subscriptions, tweets, likes, and a creator dashboard — all secured with JWT-based authentication.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Base URL](#-base-url)
- [Authentication](#-authentication)
- [Request Conventions](#-request-conventions)
- [API Reference](#-api-reference)
  - [Users](#1-users)
  - [Videos](#2-videos)
  - [Comments](#3-comments)
  - [Playlists](#4-playlists)
  - [Subscriptions](#5-subscriptions)
  - [Tweets](#6-tweets)
  - [Likes](#7-likes)
  - [Dashboard](#8-dashboard)
- [API Testing](#-api-testing)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

This backend replicates the core functionality of a video-sharing platform such as YouTube combined with a lightweight social feed (tweets). It exposes a fully-featured REST API covering:

- 🔐 Secure user authentication with JWT (access + refresh tokens) and HTTP-only cookies
- 🎥 Video upload, publishing, and management via Cloudinary
- 💬 Threaded comments with pagination
- 📃 Custom playlists
- 🔔 Channel subscriptions
- 🐦 Short-form text posts (tweets)
- ❤️ Likes across videos, comments, and tweets
- 📊 Creator dashboard with channel statistics

> 🔗 **Live demo / GitHub repo:** _add your deployed URL and repo link here_

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the backend |
| **Express.js** | Web framework and routing |
| **MongoDB** | NoSQL database |
| **Mongoose** | Object Data Modeling (ODM) for MongoDB |
| **JWT** | Access & refresh token authentication |
| **Cloudinary** | Cloud storage for videos and images |
| **Multer** | Middleware for handling file uploads |
| **bcrypt** | Password hashing |
| **Postman** | API testing and documentation |

---

## 🌐 Base URL

```
http://localhost:8000/api/v1
```

> Update this to your production URL once deployed (e.g. `https://api.yourdomain.com/api/v1`).

---

## 🔑 Authentication

Protected routes require a valid **JWT access token**, sent via the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

The API also supports **HTTP-only cookies** for both access and refresh tokens, so the same endpoints work seamlessly for browser-based clients.

**Example authenticated request:**

```http
GET http://localhost:8000/api/v1/users/current/user
Authorization: Bearer <access_token>
```

---

## 📋 Request Conventions

| Convention | Details |
|---|---|
| JSON requests | `Content-Type: application/json` |
| File uploads | `Content-Type: multipart/form-data` |
| Route params | `:videoId`, `:commentId`, `:userId`, etc. are MongoDB ObjectIDs |
| Query params | Optional unless explicitly stated |

---

## 📚 API Reference

Legend: 🔒 = Authentication required · 🔓 = No authentication required

### 1. Users

**11 endpoints** — registration, login/logout, profile, and channel data.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/users/register` | 🔓 | Register a new user |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/users/login` | 🔓 | Log in a user |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/users/logout` | 🔒 | Log out the current user |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/users/refresh-token` | 🔓 | Refresh the access token |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/users/change-password` | 🔒 | Change the current password |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/users/current/user` | 🔒 | Get the authenticated user |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/users/update-account` | 🔒 | Update account details |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/users/avatar` | 🔒 | Update avatar image |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/users/cover-image` | 🔒 | Update cover image |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/users/c/:username` | 🔒 | Get a user's channel profile |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/users/history` | 🔒 | Get authenticated user's watch history |

<details>
<summary><strong>Request / response details</strong></summary>

#### Register User
`POST /users/register` · `multipart/form-data`

| Field | Type | Required |
|---|---|:---:|
| `fullName` | Text | ✅ |
| `email` | Text | ✅ |
| `username` | Text | ✅ |
| `password` | Text | ✅ |
| `avatar` | File | ✅ |
| `coverImage` | File | ❌ |

#### Login User
`POST /users/login` · `application/json`

```json
{
  "email": "user@gmail.com",
  "password": "12345678"
}
```

#### Change Password
`POST /users/change-password` · `application/json`

```json
{
  "oldPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

#### Update Account Details
`PATCH /users/update-account` · `application/json`

```json
{
  "fullName": "Updated Name",
  "email": "updated@gmail.com"
}
```

#### Update Avatar / Cover Image
`PATCH /users/avatar` and `PATCH /users/cover-image` · `multipart/form-data`, single file field (`avatar` / `coverImage`).

#### Get User Channel Profile
```http
GET http://localhost:8000/api/v1/users/c/hit
```

</details>

---

### 2. Videos

**6 endpoints** — publish, browse, update, and manage videos.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/videos` | 🔒 | List videos (search + pagination) |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/videos` | 🔒 | Publish a new video |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/videos/:videoId` | 🔒 | Get a video by ID |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/videos/:videoId` | 🔒 | Update video details / thumbnail |
| ![DELETE](https://img.shields.io/badge/DELETE-f93e3e?style=flat-square) | `/videos/:videoId` | 🔒 | Delete a video |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/videos/toggle/publish/:videoId` | 🔒 | Toggle publish status |

<details>
<summary><strong>Request / response details</strong></summary>

#### Get All Videos
`GET /videos`

| Query Param | Description |
|---|---|
| `page` | Page number |
| `limit` | Videos per page |
| `query` | Search by title |
| `userId` | Filter by uploader |

```http
GET http://localhost:8000/api/v1/videos?page=1&limit=10
GET http://localhost:8000/api/v1/videos?query=node
```

#### Publish Video
`POST /videos` · `multipart/form-data`

| Field | Type | Required |
|---|---|:---:|
| `title` | Text | ✅ |
| `description` | Text | ✅ |
| `videoFile` | File | ✅ |
| `thumbnail` | File | ✅ |

> Video and thumbnail files are uploaded and stored on **Cloudinary**.

#### Update Video
`PATCH /videos/:videoId` · `multipart/form-data` (accepts an optional thumbnail upload)

```json
{
  "title": "Updated Video Title",
  "description": "Updated video description"
}
```

#### Delete Video
`DELETE /videos/:videoId` — removes the video document from MongoDB and deletes the associated video/thumbnail assets from Cloudinary.

</details>

---

### 3. Comments

**4 endpoints** — add, edit, and manage comments on videos.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/comments/:videoId` | 🔒 | Get comments for a video (paginated) |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/comments/:videoId` | 🔒 | Add a comment |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/comments/c/:commentId` | 🔒 | Update a comment |
| ![DELETE](https://img.shields.io/badge/DELETE-f93e3e?style=flat-square) | `/comments/c/:commentId` | 🔒 | Delete a comment |

<details>
<summary><strong>Request / response details</strong></summary>

```http
GET http://localhost:8000/api/v1/comments/VIDEO_ID?page=1&limit=10
```

```json
// POST /comments/:videoId  and  PATCH /comments/c/:commentId
{
  "content": "Great video!"
}
```

</details>

---

### 4. Playlists

**7 endpoints** — create and manage playlists.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/playlist` | 🔒 | Create a playlist |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/playlist/:playlistId` | 🔒 | Get a playlist by ID |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/playlist/user/:userId` | 🔒 | Get all playlists for a user |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/playlist/:playlistId` | 🔒 | Update a playlist |
| ![DELETE](https://img.shields.io/badge/DELETE-f93e3e?style=flat-square) | `/playlist/:playlistId` | 🔒 | Delete a playlist |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/playlist/add/:videoId/:playlistId` | 🔒 | Add a video to a playlist |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/playlist/remove/:videoId/:playlistId` | 🔒 | Remove a video from a playlist |

<details>
<summary><strong>Request / response details</strong></summary>

```json
// POST /playlist  and  PATCH /playlist/:playlistId
{
  "name": "My Favorites",
  "description": "My favorite videos"
}
```

</details>

---

### 5. Subscriptions

**3 endpoints** — subscribe to channels and view subscriber/subscription lists.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/subscriptions/c/:channelId` | 🔒 | Toggle subscription to a channel |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/subscriptions/c/:channelId` | 🔒 | Get a channel's subscribers |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/subscriptions/u/:subscriberId` | 🔒 | Get channels a user is subscribed to |

<details>
<summary><strong>Request / response details</strong></summary>

#### Subscribe / Unsubscribe
`POST /subscriptions/c/:channelId` — no request body required. Creates a subscription if none exists, or removes it if one does.

```http
POST http://localhost:8000/api/v1/subscriptions/c/CHANNEL_ID
```

</details>

---

### 6. Tweets

**4 endpoints** — short-form text posts tied to a user's channel.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/tweets` | 🔒 | Create a tweet |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/tweets/user/:userId` | 🔒 | Get all tweets for a user |
| ![PATCH](https://img.shields.io/badge/PATCH-fca130?style=flat-square) | `/tweets/:tweetId` | 🔒 | Update a tweet |
| ![DELETE](https://img.shields.io/badge/DELETE-f93e3e?style=flat-square) | `/tweets/:tweetId` | 🔒 | Delete a tweet |

<details>
<summary><strong>Request / response details</strong></summary>

```json
// POST /tweets  and  PATCH /tweets/:tweetId
{
  "content": "Hello from my backend!"
}
```

</details>

---

### 7. Likes

**4 endpoints** — like/unlike videos, comments, and tweets.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/likes/toggle/v/:videoId` | 🔒 | Toggle like on a video |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/likes/toggle/c/:commentId` | 🔒 | Toggle like on a comment |
| ![POST](https://img.shields.io/badge/POST-49cc90?style=flat-square) | `/likes/toggle/t/:tweetId` | 🔒 | Toggle like on a tweet |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/likes/videos` | 🔒 | Get videos liked by the current user |

---

### 8. Dashboard

**2 endpoints** — creator-facing channel analytics.

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/dashboard/stats` | 🔒 | Get channel statistics |
| ![GET](https://img.shields.io/badge/GET-61affe?style=flat-square) | `/dashboard/videos` | 🔒 | Get videos owned by the current channel |

---

## ✅ API Testing

All endpoints listed above have been tested end-to-end using **Postman**, covering:

- User authentication and profile management
- Video management
- Comments
- Playlists
- Subscriptions
- Tweets
- Likes
- Dashboard

> 💡 _Tip: Export your Postman collection as `postman_collection.json` and link/embed it here so others can import and test the API directly._

---

## 📁 Project Structure

```
youtube-backend/
├── src/
│   ├── controllers/     # Route handler logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   ├── middlewares/     # Auth, multer, error handling
│   ├── utils/           # Helpers (Cloudinary, async handler, API error/response)
│   ├── db/               # Database connection
│   └── app.js
├── public/               # Temp storage for uploads
├── .env.sample
├── package.json
└── README.md
```

> _Adjust this tree to match your actual repository layout._

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/youtube-backend.git
cd youtube-backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.sample .env
# then fill in MongoDB URI, JWT secrets, and Cloudinary keys

# 4. Run the development server
npm run dev
```

**Required environment variables** (example):

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **Chai aur Code**

---

<p align="center">Built with ❤️ using Node.js, Express, and MongoDB</p>
