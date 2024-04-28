//import { useState } from 'react';
import './App.css';

import LandingPage from './pages/landingPage/landingPage';
import {Login} from './pages/login/client/loginPage/Login';

//importing react router dom
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: 'Login',
        element: <Login/>
    },
    {
        path: 'LandingPage',
        element: <LandingPage/>
    }
])
function App() {
  //const [count, setCount] = useState(0)

  return (
      <div>
          <RouterProvider router={router}/>
      </div>
  )
}

export default App
