# Project Setup Guide

## Local Development Setup

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Environment Configuration**
    Create a new `.env` file in the project root and add:
    ```env
    DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
    ```
    Replace `USERNAME`, `PASSWORD`, and `DATABASE_NAME` with your PostgreSQL credentials.

4. **Database Migration**
    ```bash
    npx prisma db push
    npx prisma generate
    ```

5. **Start Development Server**
    ```bash
    npm run dev
    # Alternative package managers:
    # yarn dev
    # pnpm dev
    # bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

![image](https://github.com/user-attachments/assets/cac97222-d08a-4b0f-838a-9a41540cb0cb)
