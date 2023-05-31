import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Register from "../src/components/register.component";
import { BrowserRouter } from "react-router-dom";

// Unit Test für die Register-Komponente

describe("Register", () => {
  it("should render all register-form components correctly", async () => {
    // Rendern der Register-Komponente innerhalb des BrowserRouter
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Warten auf das Rendern der Komponente und Überprüfung der Ergebnisse
    await waitFor(() => {
      // Überprüfen, ob das Textelement "Username" gerendert wurde
      const usernameElement = screen.getByText("Username");
      expect(usernameElement).toBeInTheDocument;

      // Überprüfen, ob das Textelement "Email" gerendert wurde
      const emailElement = screen.getByText("Email");
      expect(emailElement).toBeInTheDocument;

      // Überprüfen, ob das Textelement "Password" gerendert wurde
      const passwordElement = screen.getByText("Password");
      expect(passwordElement).toBeInTheDocument;
    });
  });
});
