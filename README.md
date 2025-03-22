# HRnet
Welcome to HRnet! This is our company's internal application to create and view employee records.

---

HRNet is an employee management application that lets you create new employees, 
view them, and leverage various features (sorting, pagination, searching, etc.) via a dynamic table.

---

Table of Contents

- Project Overview
- Technologies and Tools
- Prerequisites
- Installation
- Usage
- Key Features
- Project Structure
- Tips & Customization
- Deployment
- Additional Resources
- License

---

## Project Overview
HRNet is a minimalistic HR (Human Resources) management application:
- Create an employee: a form collects personal info (first name, last name, birth date, department, etc.).
- View the employee list in a paginated table with sorting and searching.
- Store/update data locally with Context (or potentially on a backend).

Live Demo: https://hrnet-react-ecru.vercel.app/ 

---

## Technologies and Tools
- React: JavaScript library for building user interfaces
- React Router: Page-to-page navigation
- easyv2-table: Table component for listing employees (pagination, sorting, search)
- Vite (or CRA): Bundler / Dev server
- TypeScript (optional): Static typing
- CSS Modules: Scoped styling
- (Others): react-datepicker, react-icons, etc.

--- 

## Prerequisites

- Node.js >= 14 or 16 (depending on your config)
- npm or yarn
- Modern browser (Chrome/Firefox/Edge)

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Maxb06/HRNet-React
```

### 2. Navigate to the project folder
```bash
cd HRNet-React
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the dev server
```bash
npm run dev
```

The application will be accessible at http://localhost:5173 (or a different port depending on Vite).

---

## Usage
- On the home page ("/"), fill in the form to create a new employee.
- Click “Save”: the employee is added to the context, and a confirmation message appears.
- Go to “View Current Employees”: a table displays the employee list.
- Sorting: click a header to toggle ascending/descending order.
- Search: use the search bar to filter by name, city, etc.
- Pagination: select how many entries per page (10,25,50,100) and navigate using “Previous” / “Next” / page buttons.

--- 

## Key Features

Create Employee Form :
- Fields: first name, last name, date of birth, start date, street, city, state, zip code, department
- DatePicker for date fields
- Select for department, etc.

Employee List :
- Paginated display using easyv2-table
- Sorting on each column
- Global search
- “Show X entries” selector (10,25,50,100)

Data Storage :
- By default, uses React Context or local storage (can be adapted to a real backend if needed).

--- 

## Project Structure

- `src/` : Main application code
- `src/components/` : Reusable components
- `src/hooks/` : Custom hooks
- `src/pages/` : Application pages
- `src/context/` : App-wide context
- `src/data/` : Static data

---

## Tips & Customization

- Styling: to override easyv2-table defaults, target the .easyv2-* classes.
- Date format: :

```ts
new Date(value).toLocaleDateString("en-US")
```

- Data Persistence: adapt to store in a backend or local storage as needed.

---

## Deployment

On Vercel
1. Connect your GitHub repo to Vercel.
2. Vercel detects React/Vite and runs npm run build.
3. Your site is deployed at https://<your-project>.vercel.app/.

---

## Additional Resources

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [easyv2-table](https://www.npmjs.com/package/easyv2-table)

---

## Licence

OpenClassrooms
MIT License

Copyright (c) 2025 - Maxb06 - Maxime Brunet.
