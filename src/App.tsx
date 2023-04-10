import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './Home';
import Post from './Post';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error';


function App() {
  // console.log(process);
  // console.log("App");

  // dotenv.config();


  // console.log(process.env)


  const router = createBrowserRouter([

    {
      path: "/post/:id",
      element: <Post />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:id",
      element: <Home />,
      errorElement: <ErrorPage />,

      // loader: rootLoader,
      children: [
        {
          path: "/:id",
          element: <Home />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);


  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router} />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
