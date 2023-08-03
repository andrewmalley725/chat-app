import { React } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import { io } from 'socket.io-client';
import './App.css';
import Login from './components/Login';

const socket = io('http://localhost:8000');

const router = createBrowserRouter([
  {
      path: "/",
      element: <Login />,
  },
  {
      path: "/index",
      element: <Home socket={socket}/>,
  }
]);

function App() {
  return(
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
