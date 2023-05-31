// Unit test of login.component.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../src/components/login.component";
import { BrowserRouter } from "react-router-dom";

// Testing if Login component renders correctly

describe("Login", () => {
  it("should render all login-form components correctly", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    await waitFor(() => {
      const loginElement = screen.getByText("Login");
      expect(loginElement).toBeInTheDocument;

      const usernameElement = screen.getByText("Username");
      expect(usernameElement).toBeInTheDocument;

      const passwordElement = screen.getByText("Password");
      expect(passwordElement).toBeInTheDocument;
    });
  });
});
