import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../src/components/login.component";
import { BrowserRouter } from "react-router-dom";

// Unit Test für die Login-Komponente

describe("Login", () => {
  it("should render all login-form components correctly", async () => {
    // Rendern der Login-Komponente innerhalb des BrowserRouter
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Warten auf das Rendern der Komponente und Überprüfung der Ergebnisse
    await waitFor(() => {
      // Überprüfen, ob der Text "Login" gerendert wurde
      const loginElement = screen.getByText("Login");
      expect(loginElement).toBeInTheDocument;

      // Überprüfen, ob das Textelement "Username" gerendert wurde
      const usernameElement = screen.getByText("Username");
      expect(usernameElement).toBeInTheDocument;

      // Überprüfen, ob das Textelement "Password" gerendert wurde
      const passwordElement = screen.getByText("Password");
      expect(passwordElement).toBeInTheDocument;
    });
  });
});
