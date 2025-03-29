# Weather App

A modern, responsive weather application built with React and Vite that provides real-time weather information and forecasts for locations worldwide.

## 🚀 [Live Demo](https://weather-app-tawny-psi-51.vercel.app/)

## ✨ Features

- *Real-time Weather Data*: Get current weather conditions including temperature, humidity, and wind speed
- *5-Day Forecast*: View forecasted weather conditions for the next 5 days
- *Location Search*: Search for any city worldwide with autocomplete suggestions
- *Search History*: Recent searches are saved and easily accessible
- *Dark Mode*: Toggle between light and dark themes for comfortable viewing in any environment
- *Responsive Design*: Fully optimized for mobile, tablet, and desktop devices
- *Interactive UI*: Clean and intuitive user interface with animated loading states

## 🛠 Technologies Used

- *React*: Modern front-end library for building user interfaces
- *Vite*: Next-generation front-end tooling for faster development
- *Tailwind CSS*: Utility-first CSS framework for rapid UI development
- *shadcn/ui*: High-quality, accessible UI components built with Radix UI and Tailwind
- *OpenWeatherMap API*: Reliable API for weather data
- *Lucide React*: Beautiful, customizable icons
- *Local Storage*: For persisting user preferences and search history

## 📋 Project Structure
```bash
/src
/assets         - Static assets
/components     - React components
/ui           - UI components from shadcn/ui
SearchBar     - Search with autocomplete
WeatherCard   - Main weather display
ForecastList  - 5-day forecast display
HistoryList   - Search history component
ThemeToggle   - Dark/Light mode toggle
/lib            - Utility functions
App.jsx         - Main application component
main.jsx        - Application entry point


## ⚙ Implementation Details

### Weather Data Fetching
- Utilizes the OpenWeatherMap API to fetch current weather and 5-day forecast data
- Implements concurrent API requests using Promise.all for efficient data loading
- Handles loading states and error scenarios gracefully

### Search Functionality
- Provides real-time search suggestions as users type
- Implements debounce pattern to reduce unnecessary API calls
- Saves search history to local storage for persistence across sessions

### UI Components
- Implements a component-based architecture for better code organization and reusability
- Uses shadcn/ui components for consistent styling and accessibility
- Custom styling with Tailwind CSS for responsive design

### Theme Management
- Implements a dark/light mode toggle with theme persistence
- Uses CSS variables for consistent theming across components
- Dynamically applies theme classes to the document root

### State Management
- Uses React's useState and useEffect hooks for state management
- Implements localStorage for persisting user preferences and search history
- Maintains a clean state flow throughout the component hierarchy

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn package manager
- OpenWeatherMap API key (create one for free at [OpenWeatherMap](https://openweathermap.org/api))

### Installation

1. Clone the repository
   
   git clone https://github.com/rahul87sharma/Weather-app.git
   cd Weather-app

2. Install dependencies

npm install
or
yarn install

3. Create a .env file in the root directory with your API key

VITE_OPENWEATHER_API_KEY=your_api_key_here

4. Start the development server

npm run dev
or
yarn dev

5. Open your browser and navigate to http://localhost:5173

📦 Build for Production

npm run build
or
yarn build

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License
This project is MIT licensed.

👨‍💻 Author
Rahul Sharma

- GitHub: [@rahul87sharma](https://github.com/rahul87sharma)
