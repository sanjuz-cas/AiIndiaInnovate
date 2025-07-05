# The AI Indian - Full-Stack Web Application

## Overview

The AI Indian is a modern full-stack web application built for an AI research and products company. The application serves as a corporate website showcasing AI technology developments with a focus on Indian contexts and global needs. The project uses a monorepo structure with a React frontend and Express.js backend, utilizing PostgreSQL with Drizzle ORM for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **Animation**: Framer Motion for smooth animations and transitions
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **API Design**: RESTful API with `/api` prefix

### Development Architecture
- **Monorepo Structure**: Shared types and schemas between frontend and backend
- **Development Server**: Vite dev server with HMR integration
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Linting**: Built-in TypeScript checking and Vite error overlay

## Key Components

### Directory Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui component library
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and configurations
├── server/           # Express.js backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Development server integration
├── shared/           # Shared types and schemas
│   └── schema.ts     # Drizzle database schemas
└── migrations/       # Database migration files
```

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Zod schemas for runtime type checking
- **Type Safety**: Full TypeScript integration with Drizzle ORM

### UI System
- **Design System**: Custom dark theme with neutral color palette
- **Component Library**: Complete shadcn/ui implementation
- **Typography**: Inter and Poppins font families
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Data Flow

### Client-Server Communication
1. **API Requests**: Custom `apiRequest` function with error handling
2. **Query Management**: TanStack Query for caching and synchronization
3. **Error Handling**: Centralized error handling with toast notifications
4. **Authentication**: Cookie-based sessions with credential inclusion

### Development Flow
1. **Hot Reload**: Vite HMR for instant frontend updates
2. **API Logging**: Comprehensive request/response logging in development
3. **Error Overlay**: Runtime error modal for development debugging
4. **Type Checking**: Real-time TypeScript validation

## External Dependencies

### Core Technologies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **UI Components**: Radix UI primitives
- **Animation**: Framer Motion
- **Fonts**: Google Fonts (Inter, Poppins)

### Development Tools
- **Build System**: Vite with React plugin
- **Replit Integration**: Cartographer plugin and runtime error modal
- **PostCSS**: Autoprefixer and Tailwind CSS processing

### Production Dependencies
- Form handling with React Hook Form and Zod validation
- Date manipulation with date-fns
- Carousel functionality with Embla Carousel
- Command palette with cmdk

## Deployment Strategy

### Build Process
- **Frontend Build**: Vite builds to `dist/public`
- **Backend Build**: esbuild bundles server to `dist/index.js`
- **Asset Optimization**: Vite handles code splitting and asset optimization

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Development Mode**: NODE_ENV-based configuration
- **Session Storage**: PostgreSQL-based session store for scalability

### Production Deployment
- **Static Assets**: Served from `dist/public`
- **API Server**: Express.js serves API routes and fallback to SPA
- **Database Migrations**: Drizzle migrations in `/migrations` directory

## Changelog
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.