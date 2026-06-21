import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("forgot-password", "routes/forgot-password.tsx"),
  route("reset-password", "routes/reset-password.tsx"),
  route("verify-email", "routes/verify-email.tsx"),
  route("auth/callback", "routes/auth.callback.tsx"),
  route("auth/error", "routes/auth.error.tsx"),
] satisfies RouteConfig;
