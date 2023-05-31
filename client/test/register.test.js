// Unit test of register.component.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Register from "../src/components/register.component";
import { BrowserRouter } from "react-router-dom";

// Testing if Register component renders correctly

describe("Register", () => {
  it("should render all register-form components correctly", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    await waitFor(() => {
      const usernameElement = screen.getByText("Username");
      expect(usernameElement).toBeInTheDocument;

      const emailElement = screen.getByText("Email");
      expect(emailElement).toBeInTheDocument;

      const passwordElement = screen.getByText("Password");
      expect(passwordElement).toBeInTheDocument;
    });
  });
});
