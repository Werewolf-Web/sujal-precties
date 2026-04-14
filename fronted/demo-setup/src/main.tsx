import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
const queryClient = new QueryClient();
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { store } from "./store.tsx";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  // {/* </StrictMode>, */}
);
