# Mood Journal with Weather Integration

An interactive web application to track your daily mood alongside real-time weather data.

## Project Overview

This application allows users to:
- Log their daily mood using expressive emoji icons
- Record notes about their day
- Automatically capture weather data based on current location
- View past journal entries through a calendar interface
- Filter entries by mood
- Toggle between light and dark mode

## Features

### Core Features
- **Mood Selection**: Choose from 5 different mood options (Happy, Calm, Neutral, Sad, Angry)
- **Weather Integration**: Uses the browser's geolocation API to fetch real-time weather data
- **Journal Entries**: Add personal notes to accompany your mood selection
- **Data Persistence**: All entries are stored in your browser's local storage
- **Responsive Design**: Works on both mobile and desktop screens

### User Experience
- **Calendar View**: Easily browse past entries through an interactive calendar
- **List View**: View all entries in a list format with filtering capabilities
- **Dark Mode**: Toggle between light and dark themes
- **Visual Feedback**: Dynamic backgrounds based on mood selection
- **Smooth Animations**: Transitions when navigating between views

## Technical Details

This project is built with:
- **React**: Frontend UI library
- **TypeScript**: For type safety
- **TailwindCSS**: For styling and responsive design
- **ShadcnUI**: Modern UI component library
- **Vite**: Fast build tool and development server
- **date-fns**: Date manipulation library
- **OpenWeatherMap API**: For fetching weather data

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser at: `http://localhost:8080`

## Usage

1. **Today's Entry**: The default view allows you to record your mood and notes for today
2. **Select a Mood**: Click on one of the mood cards to select how you're feeling
3. **Add Notes**: Write down your thoughts, activities, or anything notable
4. **Save Entry**: Click the "Save Journal Entry" button to record your entry
5. **View History**: Switch to the "Journal History" tab to view past entries
6. **Toggle Dark Mode**: Click the sun/moon icon in the header to switch themes

## Weather Integration

The app automatically fetches weather data using your current location. This requires:
- Browser permission to access your location
- Internet connection to fetch data from OpenWeatherMap API

## Data Privacy

All data is stored locally in your browser's localStorage. No data is sent to any server except for the weather API calls.

## License

This project is open source under the MIT License.
