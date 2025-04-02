# Nexora
This project is a Next.js and TypeScript-based real estate product listing page that allows users to filter properties by price and number of bedrooms and order them by price (ascending/descending), most recent, or alphabetically. Each property has an image, address, size, number of bedrooms, price, and the time it was added to the database. Users can click on any property image to view more details about the property.

## Features

## Technologies Used
- [x] Tailwind CSS
- [x] Next Js
- [x] Tanstack Query
- [x] Zod Schema
- [x] React components for Leaflet maps
- [x] DigitalOcean Spaces (Bucket)
 
### Core Features:
- **Filtering**: 
  - Filter properties by price range.
  - Filter properties by the number of bedrooms.
- **Ordering**: 
  - Order properties by price (ascending/descending).
  - Order properties by the most recent (based on the date added).
  - Order properties alphabetically by address.
- **Property Details**: 
  - Clicking on a property image navigates to a detailed view of the property under a separate link (`/property/[id]`).

## Acknowledgments

This project would not have been possible without the contributions of the following open-source projects and resources:

- **[shadCN](https://ui.shadcn.com/)**: A fantastic library that provides reusable components and utilities for building modern web applications. Thank you for creating such a powerful tool!

- **Glow Effect**: The glow effect used in this project was inspired by and adapted from [react-gradient-glow](https://github.com/developedbyed/react-gradient-glow) by [developedbyed](https://github.com/developedbyed). Special thanks for sharing this creative and visually appealing implementation.
  
