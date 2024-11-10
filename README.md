# College Surfing

A platform for discovering, rating, and discussing the best study and hackathon spots on campus.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Why Now?](#why-now)
- [Solution](#solution)
- [Key Benefits](#key-benefits)
- [Competitive Landscape](#competitive-landscape)
- [How It Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction
**College Surfing** is an interactive platform designed to help students find, rate, and discuss the best study and hackathon spots on campus, centralizing information on ideal places to work, rest, and collaborate.

## Problem Statement
Students and hackathon participants often face the challenge of locating optimal study and collaboration spaces on campus. The lack of centralized information about these spaces makes it difficult to find locations that suit individual preferences for studying or relaxing.

## Why Now?
With a growing demand for productive and comfortable study environments, there is a need for a platform that provides real-time, crowd-sourced information on campus study spots. **College Surfing** meets this need by creating a resource specifically tailored for students.

## Solution
College Surfing consolidates data about study spots across campus into an interactive map, allowing students to discover, rate, and discuss spots in a community-oriented, anonymous platform. This fosters collaboration, engagement, and a continuously improving directory of campus locations.

## Key Benefits
- **Centralized Information**: One-stop access to data on study spaces, complete with user feedback.
- **Community-Driven**: Fosters a community where students can share honest reviews.
- **Anonymity**: Anonymous interactions using verified .edu email addresses to encourage open and honest feedback.
- **Enhanced User Experience**: Provides a visually engaging, interactive campus map with real-time data.

## Competitive Landscape
While some platforms offer reviews of locations, **College Surfing** focuses exclusively on the needs of students, providing study-specific data and an interactive, map-based user experience.

## How It Works
Users access an interactive campus map where they can explore, rate, and comment on various study spots. Each spot includes specific details like noise levels, busyness, ambiance, and images. Comments and ratings update in real-time, providing dynamic feedback on each location’s popularity and quality.

## Features
- **Interactive Map**: Visual exploration of study spots on campus.
- **Detailed Spot Information**: Each location shows ratings, ambiance, and real-time data.
- **Community Engagement**: Students can rate, comment, and discuss anonymously.
- **User-Generated Content**: Allows users to add new spots and interact via Reddit-style comments and upvotes.

## Tech Stack
- **Frontend**: React, MapBox GL
- **Backend**: Flask, Firebase Firestore
- **Hosting**: Firebase Hosting
- **Map Integration**: MapBoxGL for interactive maps
- **Authentication**: Firebase Authentication for secure .edu access

## Architecture
College Surfing employs a frontend-backend architecture:
- **Frontend**: Built with React for dynamic UI and MapBoxGL for map visualization.
- **Backend**: Flask API server that communicates with Firebase Firestore for data management and Firebase Authentication for user verification.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm
- Firebase CLI

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/judecoe/hackPrinceton2024
   cd hackPrinceton2024
2. Install dependencies:
```bash
Copy code
npm install
```
### Configuration
Set up Firebase Hosting by running:

bash
```Copy code
firebase init hosting
```
Follow the prompts to select your Firebase project and specify your public directory (e.g., build or dist).

Configure your environment variables:

Add your MapBox access token in a configuration file (e.g., .env.local or in your project’s settings as required).
Firebase and MapBox credentials should be securely stored and referenced within the code.
### Usage
To start the development server, run:

bash
```
Copy code
npm start
```
Then open your browser and navigate to http://localhost:3000 to view and interact with the application.

To deploy the latest version to Firebase Hosting:

bash
```
Copy code
firebase deploy --only hosting
```

### API Endpoints
Endpoint	Method	Description
/spots	GET	Fetches all study spots available on the map.
/spots/:id	GET	Fetches details for a specific study spot.
/spots	POST	Adds a new study spot (authenticated users).
/comments	POST	Allows users to post a comment on a spot.
/comments/:id	DELETE	Deletes a specific comment by ID.

### Testing
To run tests, execute:

bash
```Copy code
npm test
```
You can configure your tests in the tests/ directory for both frontend and backend testing.

### Contributing
We welcome contributions! To contribute, please follow these steps:

Fork the repository and create your branch:

bash
```Copy code
git checkout -b feature/YourFeatureName
Commit your changes:
```
bash
```Copy code
git commit -m "Add your message here"
Push to the branch:
```
bash
```Copy code
git push origin feature/YourFeatureName
Open a Pull Request and describe your changes.
```
Please make sure your code adheres to the project’s coding standards and is thoroughly tested.

### License
This project is licensed under the MIT License - see the LICENSE file for more information.

### Contact
For questions, suggestions, or collaboration, feel free to reach out via GitHub.
