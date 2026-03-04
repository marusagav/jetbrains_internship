# jetbrains_internship

## Overview
A simple React-based task tracker allowing you to add, edit, toggle, and delete tasks. Tasks persist in localStorage, and pending tasks are displayed above completed ones. The app uses modern SCSS with centralized variables for styling and responsive hover effects.

## Setup & Run Instructions
1. Clone the repository
   ``` bash
   git clone https://github.com/marusagav/jetbrains_internship.git 
   cd css-demo
   ```
3. Install dependencies
   ``` bash
   npm install
   ```
5. Run the development server
   ``` bash
   npm run dev
   ```
7. Build for production
   ``` bash
   npm run build
   ```
9. Preview production build
    ``` bash
   npm run preview
    ```

## How SCSS is transformed into CSS
The project uses Vite + Sass. All authored SCSS files (.scss) are compiled into standard CSS by the Sass preprocessor.
Variables, nesting, and modern Sass functions (like color.scale) are converted into plain CSS properties the browser can interpret. During development, Vite injects compiled CSS into the browser with hot module replacement (HMR), so changes reflect instantly.

## Where to find the generated CSS and source maps
During development, the CSS is generated in memory by Vite. You can inspect it using your browser’s dev tools.
After running ```npm run build```, the production CSS files are located in: ```dist/assets/```  

Source maps are also generated to help debug original SCSS: ```dist/assets/*.css.map```  
These source maps allow you to see the original .scss files in the browser developer tools when inspecting elements.
