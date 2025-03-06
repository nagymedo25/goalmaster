import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Dashboard from "./page/dashboard/Dashboard";
import NotFound from "./page/notFound/NotFound";
import Goals from "./page/Goals/Goals";
import Tasks from "./page/Tasks/Tasks";
import Analytics from "./page/Analytics/Analytics";
import Assistant from "./page/Assistant/Assistant";
import Suggestions from "./page/Suggestions/Suggestions";
import Finance from "./page/Finance/Finance";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="goals" element={<Goals />} />
      <Route path="tasks" element={<Tasks goal={{ name: "My Goal", tasks: [] }} />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="assistant" element={<Assistant />} />
      <Route path="suggestions" element={<Suggestions />} />
      <Route path="finance" element={<Finance />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
