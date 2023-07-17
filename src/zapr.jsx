import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import Installation from "./installation";
import Zap from "./zap/zap";
import Preferences from "./preferences";
import localforage from "localforage";

localforage.config({ name: "zapper", storeName: "userdata" });

function Zapr(props) {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/install/*" element={<Installation />} />
          <Route path="/zap/*" element={<Zap />} />
          <Route path="/prefs" element={<Preferences />} />
          <Route path="*" element={<Navigate to="install" />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("zapr")).render(<Zapr />);
