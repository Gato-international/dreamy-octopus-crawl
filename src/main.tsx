import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import "./i18n";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <React.Suspense fallback="loading...">
    <App />
  </React.Suspense>
);