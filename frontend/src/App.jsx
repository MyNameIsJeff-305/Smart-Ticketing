import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from "./store/session";

import './index.css'

import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";

import { useEffect, useState } from "react";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <header className="header">
        {sessionUser && <Navigation />}
      </header>
      <main className='main-zone'>
        {isLoaded && <Outlet />}
      </main>
      <footer className="footer">
      </footer>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LoginFormPage />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
