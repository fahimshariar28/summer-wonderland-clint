import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h1 className="text-3xl font-bold underline">
      Welcome to Summer WonderLand
    </h1>
    <button className="btn btn-outline">Default</button>
    <button className="btn btn-outline btn-primary">Primary</button>
    <button className="btn btn-outline btn-secondary">Secondary</button>
    <button className="btn btn-outline btn-accent">Accent</button>
  </React.StrictMode>
);
