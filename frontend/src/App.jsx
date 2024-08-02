import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import LoginFormPage from "./components/LoginFormPage";
import Dashboard from "./components/Dashboard";

import { useEffect, useState } from "react";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='main-zone'>
        {isLoaded && <Outlet />}
      </div>
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
