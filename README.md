# Mohamedali Werghli - Portfolio React App

A modern, responsive portfolio website built with React for Mohamedali Werghli, a photographer and high-end retoucher. This project recreates the original HTML portfolio as a React application with improved component structure and maintainability.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, minimal aesthetic with elegant typography
- **Smooth Scrolling**: Enhanced user experience with smooth scroll behavior
- **Interactive Elements**: Scroll-to-top button and hover effects
- **Component-Based Architecture**: Modular React components for easy maintenance

## Sections

1. **Hero Section**: Introduction with background image and main title
2. **About Me**: Personal presentation and career timeline
3. **Vision & Mission**: Core philosophy and business objectives
4. **Core Values**: Key principles in French (Créativité, Originalité, Passion, etc.)
5. **Portfolio**: Three main collections:
   - Latest Creations (Infinity Collection)
   - Best Creations (Tunis Panorama & Mental Flow)
   - Other Creations (Themes 1 & 2)
6. **Collaboration Steps**: 4-step process explanation
7. **Contact**: Direct contact information and call-to-action

## Technologies Used

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icons
- **Google Fonts**: Playfair Display & Inter fonts

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── Hero.js           # Hero section with background
│   ├── About.js          # About me section
│   ├── VisionMission.js  # Vision and mission cards
│   ├── Values.js         # Core values display
│   ├── Portfolio.js      # Portfolio galleries
│   ├── Steps.js          # Collaboration steps
│   ├── Contact.js        # Contact section
│   ├── Footer.js         # Footer
│   └── ScrollToTop.js    # Scroll to top button
├── App.js                # Main app component
├── index.js              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- Primary Dark: `#212121`
- Subtle Gray: `#f7f7f7`
- Mid Gray: `#6b7280`
- White Card: `#ffffff`

### Images
Replace placeholder images with actual portfolio images:
- Update image URLs in the respective components
- Recommended image sizes:
  - Hero background: 1920x1080
  - Portfolio images: 600x600 (square)
  - About portrait: 600x600

### Content
Edit text content directly in the component files to match your specific information.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Mohamedali Werghli's portfolio. All rights reserved.

## Contact

For questions about this React implementation, please contact the developer.
