// src/App.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Import Layout & Halaman-Halaman
import { Layout } from './components/layout/Layout';
import RequireAuth from './routes/RequireAuth';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RedirectAuth from './routes/RedirectAuth';
import { ReportsPage } from './pages/ReportsPage';
import { LandingPage } from './pages/LandingPages';

const router = createBrowserRouter([
  // Rute publik
  {
      path: '/home',
      element: <LandingPage />,
  },
  // {
  //     path: '/register',
  //     element: <RegisterPage />,
  // },
  {
    element: <RedirectAuth />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      }
    ],
  },

  // Rute privat yang dilindungi
  {
    element: <RequireAuth />, // Gerbangnya di sini
    children: [
      {
        path: '/',
        element: <Layout />, // Layout sebagai "rumah"
        children: [
          // Halaman-halaman di dalam rumah
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'transactions',
            element: <TransactionsPage />,
          },
          {
            path: 'reports',
            element: <ReportsPage />,
          },
          // Tambahkan halaman lain di sini nanti
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;