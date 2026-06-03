# Technical Exam: Associate Software Engineer

A full-stack web application for managing factories and employees built with Laravel, React, and modern frontend tooling.

---

## Development Process

The project was developed using an iterative full-stack approach:

1. **Project Setup**
    - Initialized Laravel backend with authentication scaffolding (Fortify / Breeze or custom auth setup).
    - Integrated React with Inertia.js for seamless SPA-like behavior.

2. **Database Design**
    - Designed relational structure for `employees` and `factories`.
    - Implemented migrations and Eloquent relationships (Factory ↔ Employees).

3. **Backend Development**
    - Built RESTful controllers for CRUD operations.
    - Added validation rules using Form Requests.
    - Implemented feature tests for authentication and CRUD operations.

4. **Frontend Development**
    - Created reusable React components (forms, tables, layouts).
    - Used Tailwind CSS for styling and responsive UI.
    - Implemented dynamic data loading using `fetch` / `async-await`.

5. **Testing & CI**
    - Wrote unit and feature tests using PHPUnit.
    - Ensured CI pipeline passes by fixing factory instantiation and route issues.
    - Debugged issues such as unused variables, factory errors, and missing exports.

6. **Challenges & Solutions**
    - **1: Difficult backend debugging (laravel.log)**  
      At first, I didn’t know about `laravel.log`, which made debugging API and test issues harder because errors were not clearly visible. I later implemented logging using `Log::info()` and `Log::error()` in controllers and exception blocks, which helped track request data, validation errors, and factory/test failures more clearly.
    - **2: Slow first-time search experience (no debounce)**  
      At first, I didn’t know about debounce, so search inputs triggered API requests on every keystroke which caused unnecessary server load and a laggy first-time user experience. I later implemented debounce to delay the request until the user stops typing, improving performance and making the UI smoother.
    - **3:** Ensured proper model factory usage and Laravel version compatibility.
    - **4:** ESLint errors for unused variables  
      **5:** Cleaned up React components and removed unused props.
    - **7:** API data rendering inconsistencies  
      **8:** Added proper loading, empty, and error states in UI.

---

## Tools & Libraries

### Backend

- Laravel 13 (PHP Framework)
- MySQL (Database)
- Laravel Fortify / Breeze (Authentication)
- PHPUnit (Testing)
- Eloquent ORM

### Frontend

- React 18
- TypeScript
- Inertia.js
- Tailwind CSS
- Vite (Build tool)

### Developer Tools

- Node.js & npm
- ESLint (Linting)
- Prettier (Code formatting)
- Git & GitHub (Version control)

### AI Tools

- ChatGPT — Used for debugging Laravel factory issues, test failures, and structuring feature tests.
- GitHub Copilot — Assisted in generating boilerplate React components and form logic.

---

## External Resources

- Laravel Documentation: https://laravel.com/docs
- React Documentation: https://react.dev/
- Inertia.js Documentation: https://inertiajs.com/
- Tailwind CSS Docs: https://tailwindcss.com/docs
- PHPUnit Testing Guide: https://phpunit.de/documentation.html

---

## Setup Instructions

### Backend (Laravel)

1. Clone the repository:

```bash
git clone https://github.com/your-username/factory-employee-management-system.git
cd factory-employee-management-system

2. Install PHP dependencies:
composer install

3. Copy environment configuration file:
cp .env.example .env

4. Generate application key:
php artisan key:generate

5. Set up your database in .env:
DB_DATABASE = your database name
DB_USERNAME = your database username
DB_PASSWORD = your database password

6. Run database migrations:
php artisan migrate

7. Start the Laravel development server:
php artisan serve


### Frontend (React / Vite)

1. Install Node dependencies:
npm install

2. Start the frontend development server:
npm run dev


### Running Tests
1. Run all backend tests:
php artisan test
```
