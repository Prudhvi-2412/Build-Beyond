import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

vi.mock("./Pages/login-signup/LoginSignUp", () => ({
  default: () => <div>Login Page</div>,
}));
vi.mock("./Pages/admin/AdminLogin", () => ({
  default: () => <div>Admin Login Page</div>,
}));
vi.mock("./Pages/admin/PlatformManagerLogin", () => ({
  default: () => <div>Platform Manager Login Page</div>,
}));
vi.mock("./Pages/customer/Customer", () => ({
  default: () => <div>Customer Dashboard</div>,
}));
vi.mock("./Pages/company/Company", () => ({
  default: () => <div>Company Dashboard</div>,
}));
vi.mock("./Pages/worker/Worker", () => ({
  default: () => <div>Worker Dashboard</div>,
}));
vi.mock("./Pages/admin/Admin", () => ({
  default: () => <div>Admin Dashboard</div>,
}));
vi.mock("./Pages/platformmanager/PlatformManager", () => ({
  default: () => <div>Platform Manager Dashboard</div>,
}));
vi.mock("./Pages/NotFound", () => ({
  default: () => <div>Not Found Page</div>,
}));
vi.mock("./Pages/Unauthorized", () => ({
  default: () => <div>Unauthorized Page</div>,
}));
vi.mock("./components/ProtectedRoute", () => ({
  default: ({ children }) => <>{children}</>,
}));
vi.mock("./components/AdminProtectedRoute", () => ({
  default: ({ children }) => <>{children}</>,
}));

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App route smoke tests", () => {
  it("renders login route", () => {
    renderAt("/");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders admin login route", () => {
    renderAt("/admin-login");
    expect(screen.getByText("Admin Login Page")).toBeInTheDocument();
  });

  it("renders customer dashboard route", () => {
    renderAt("/customerdashboard");
    expect(screen.getByText("Customer Dashboard")).toBeInTheDocument();
  });

  it("renders admin dashboard route", () => {
    renderAt("/admin-view");
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  it("falls back to not found for unknown routes", () => {
    renderAt("/some-random-route");
    expect(screen.getByText("Not Found Page")).toBeInTheDocument();
  });
});
