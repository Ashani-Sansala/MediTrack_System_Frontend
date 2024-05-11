//import { useState } from 'react';
import './App.css';

import HistoricalRecords from './pages/historicalRecords/historicalRecords';
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
        path: 'HistoricalRecords',
        element: <HistoricalRecords/>
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
