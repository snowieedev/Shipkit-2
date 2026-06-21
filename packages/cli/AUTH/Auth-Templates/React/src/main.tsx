import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import LoginPage from './routes/login'
import SignupPage from './routes/signup'
import ForgotPasswordPage from './routes/forgot-password'
import ResetPasswordPage from './routes/reset-password'
import VerifyEmailPage from './routes/verify-email'
import AuthCallbackPage from './routes/auth-callback'
import AuthErrorPage from './routes/auth-error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">ShipKit React Auth Template</h1><a href="/login" className="text-primary hover:underline">Go to Login</a></div>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/auth-callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '/auth-error',
    element: <AuthErrorPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
