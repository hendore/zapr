import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import Welcome from "./routes/welcome";
import SetupShortcut from "./routes/setup-shortcut";
import SetupPrivateKey from "./routes/setup-privkey";
import Home from "./routes/home";
import Zap from "./routes/zap";
import { loadPreferences, getPrivateKey } from "./services/userdata";
import { usePreferences } from "./hooks";

function SetupRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/setup-shortcut" element={<SetupShortcut />} />
      <Route path="/setup-privkey" element={<SetupPrivateKey />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function AppRoutes(props) {
  const preferences = usePreferences();

  if (!preferences) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/zap" element={<Zap preferences={preferences} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(document.getElementById("zapr"));

  loadPreferences().then((preferences) => {
    getPrivateKey().then((privkey) => {
      return root.render(
        <React.StrictMode>
          <HashRouter>{!!privkey ? <AppRoutes /> : <SetupRoutes />}</HashRouter>
        </React.StrictMode>
      );
    });
  });
});
