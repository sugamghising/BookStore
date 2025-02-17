# Bookstore - React Frontend
This is a React frontend for a bookstore application. It allows users to browse books, view book details, add books to their cart, and proceed to checkout. The application uses Tailwind CSS for styling and React Context API for state management.

## Features
- **Home Page**: Displays a list of books fetched from the backend.
- **Book Detail Page**: Shows detailed information about a specific book.
- **Cart Page**: Displays items added to the cart and allows users to remove items or clear the cart.
- **Login Page**: Handles user authentication.
- **Register Page**: Allows new users to create an account.
- **Checkout Page**: Handles the checkout process and order placement.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing and navigation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: For making HTTP requests to the backend API.
- **React Context API**: For managing global state (e.g., authentication, cart).

## Folder Structure
```
my-react-app/
├── public/
│   ├── index.html                # HTML entry point
│   ├── assets/                   # Static assets (images, fonts, etc.)
│   └── favicon.ico               # Favicon
├── src/
│   ├── assets/                   # Static assets (images, icons, etc.)
│   ├── components/               # Reusable UI components
│   │   ├── BookCard.js           # Displays book details
│   │   ├── Navbar.js             # Main navigation bar
│   │   ├── Footer.js             # Footer for the app
│   │   ├── SearchBar.js          # Search bar for searching books
│   │   └── Modal.js              # Modal component (for login, book details, etc.)
│   ├── context/                  # React Context for state management
│   │   ├── AuthContext.js        # Context for user authentication
│   │   └── CartContext.js        # Context for shopping cart
│   ├── pages/                    # Views / Pages of the website
│   │   ├── HomePage.js           # Home page with book listings
│   │   ├── BookDetailPage.js     # Page with details of a specific book
│   │   ├── CartPage.js           # Page showing the shopping cart
│   │   ├── CheckoutPage.js       # Checkout page for order placement
│   │   ├── LoginPage.js          # Login page for user authentication
│   │   └── RegisterPage.js       # Registration page for new users
│   ├── services/                 # API services
│   │   ├── authService.js        # Authentication-related API calls
│   │   ├── bookService.js        # Book-related API calls
│   │   └── cartService.js        # Cart-related API calls
│   ├── App.js                    # Root component
│   ├── index.js                  # React entry point (renders App)
│   ├── App.css                   # Global styles for the app
│   ├── routes.js                 # App routing configuration (React Router)
└── .env                           # Environment variables (API keys, etc.)
```

## Setup Instructions
### Prerequisites
- Node.js and npm installed on your machine.
- A backend API to fetch data (e.g., books, user authentication).

### Steps
1. Clone the Repository:
```bash
git clone https://github.com/sugamghising/BookStore.git
cd BookStore/my-react-app
```
2. Install Dependencies:
```bash
npm install
```

Set Up Environment Variables:

3. Create a .env file in the root directory.
- Add your backend API URL
 ```
    REACT_APP_API_URL=http://localhost:5000/api
 ```    
    
4. Run the Application:
```bash
npm start
```
- The app will start on http://localhost:3000.
5. Build for Production:
```bash
npm run build
```

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.


## Acknowledgments
- Tailwind CSS for the amazing utility-first CSS framework.
- React for the powerful UI library.
- Axios for making HTTP requests.

## Contact
- If you have any questions or feedback, feel free to reach out:
- Email: your-ghisingsugam04@gmail.com
- GitHub: ghisingsugam

---
Made with ❤️ by [Sugam Ghising](https://github.com/ghisingsugam)

Enjoy building your bookstore frontend! 🚀
