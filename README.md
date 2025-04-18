# OutFlo Client

A modern Campaign Management System built with React, TypeScript, and Vite to efficiently create, manage, and track marketing campaigns.

## Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **css**:Tailwindcss

## Features

- Campaign creation, editing, and deletion
- Responsive design for all devices
- API integration with backend services
- Environment-based configuration

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/outflo-assignment.git
   cd outflo-assignment/client
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the project root and add the necessary environment variables

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run tests
- `npm run preview` - Preview the production build locally

## Project Structure

```
client/
├── public/             # Static assets
├── src/
│   ├── api/            # API service layer
│   ├── assets/         # Images and static resources
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Application pages
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic services
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── vite-env.d.ts   # Vite type definitions
├── .env                # Environment variables
├── .eslintrc.js        # ESLint configuration
├── index.html          # HTML entry
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Environment Variables

The application uses environment variables for configuration:

- `VITE_API_BASE_URL`: The base URL for API requests

## Deployment

Build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Original Vite Template Information

This project was bootstrapped with the Vite template. For more information, visit the [Vite documentation](https://vitejs.dev/).
