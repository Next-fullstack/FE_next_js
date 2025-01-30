# Project Setup Guide

## Local Development Setup

1. **Clone the repository**

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Environment Configuration**
    Create a new `.env` file in the project root and add:
    ```env
    DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
    ```

4. **Start Development Server**
    ```bash
    npm run dev
    # Alternative package managers:
    # yarn dev
    # pnpm dev
    # bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
