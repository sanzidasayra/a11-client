import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Bookshelf from "../Pages/Bookshelf";
import MyBooks from "../Pages/MyBooks";
import AddBook from "../Pages/AddBook";
import Profile from "../Pages/Profile";
import Login from "../Form/Login";
import Register from "../Form/Register";
import ViewDetailsBook from "../Pages/ViewDetailsBook";
import ErrorPage from "../ErrorPage";
import UpdateBook from "../Pages/UpdateBook";
import PrivateRoute from "../../PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: Layout,
    children: [
      {
        index: true,
        loader: () => fetch('https://a11-server-olive.vercel.app/books'),
        Component: Home
      },
      {
        path: 'books/:id',
        element: (
          <PrivateRoute>
            <ViewDetailsBook />
          </PrivateRoute>
        )
      },
      {
        path: '/bookshelf',
        loader: () => fetch('https://a11-server-olive.vercel.app/books'),
        Component: Bookshelf
      },
      {
        path: 'my-books',
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        )
      },
      {
        path: 'add-book',
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        )
      },
      {
        path: 'update-book/:id',
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);


export default router;