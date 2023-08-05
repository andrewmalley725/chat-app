import { React } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import { io } from 'socket.io-client';
import './App.css';
import Login from './components/Login';

const env = process.env.NODE_ENV;

const socket = env === 'development' ? io(process.env.REACT_APP_SOCKET) : io();
const api = env === 'development' ? process.env.REACT_APP_API_URL : 'api';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Login api={api}/>,
  },
  {
      path: "/index",
      element: <Home socket={socket} api={api}/>,
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
