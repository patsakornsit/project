import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import SkillBadge from './detail/detail1';
import './App.css';
import TableToCardSliderComponent from './test';
import App from './main';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MyButton from './intro/intro1';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MyButton/>,
  },
  {
    path: "/choosing",
    element: <App/>,
  },
  {
    path: "/choosing/details",
    element: <TableToCardSliderComponent/>,
  },
  {
    path: "/test",
    element: <SkillBadge/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
