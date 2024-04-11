//import { useState } from 'react';
import './App.css';

import Dashboard from './pages/dashboard/Dashboard';
import {Login} from './pages/login/client/loginPage/Login'

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
        path: 'Dashboard',
        element: <Dashboard/>
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
