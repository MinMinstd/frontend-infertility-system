import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import 'antd/dist/reset.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="668573337665-i5tjfgdtfb3sci3m684fimge7olqbk3g.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
