import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Index from './pages/Index.tsx';
import Auth from './pages/Auth.tsx';
import HeatPumpInstallation from './pages/HeatPumpInstallation.tsx';
import PlumbingServices from './pages/PlumbingServices.tsx';
import ElectricalServices from './pages/ElectricalServices.tsx';
import HeatingServices from './pages/HeatingServices.tsx';
import Dashboard from './pages/admin/Dashboard.tsx';
import BlogManagement from './pages/admin/BlogManagement.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "heat-pump-installation",
        element: <HeatPumpInstallation />,
      },
      {
        path: "plumbing-services",
        element: <PlumbingServices />,
      },
      {
        path: "electrical-services",
        element: <ElectricalServices />,
      },
      {
        path: "heating-services",
        element: <HeatingServices />,
      },
      {
        path: "admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "admin/blog",
        element: <BlogManagement />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);