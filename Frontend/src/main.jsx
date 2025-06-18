import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from './routes/Index.routes.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const queryClient = new QueryClient();
// Fix: Pass AllRouter directly to createBrowserRouter, not as an object
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="887319467351-53li19tu8c54q9macno3bemi59ivcs12.apps.googleusercontent.com">
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
