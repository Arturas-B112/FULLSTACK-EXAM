import { createBrowserRouter } from 'react-router-dom';
import PageTemplate from './components/layout/page-template/PageTemplate';
import RegisterPage from './pages/register-page/RegisterPage';
import LoginPage from './pages/login-page/LoginPage';
import VisitorsPage from './pages/visitors-page/VisitorsPage';
import UpdateVisitorsPage from './pages/update-visitors-page/UpdateVisitorsPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/visitors',
        element: <VisitorsPage />,
      },
      {
        path: '/visitors/:id',
        element: <UpdateVisitorsPage />,
      },
    ],
  },
]);
