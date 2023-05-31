import { render, screen, waitFor } from "@testing-library/react";
import GetWitz from "../src/components/GetWitz";
import React from "react";

describe("GetWitz", () => {
  it("should render joke setup and punchline if data is fetched successfully", async () => {
    // Mock-Daten für den erfolgreichen Datenabruf
    const mockData = {
      setup: "Why did the chicken cross the road?",
      punchline: "To get to the other side!",
    };

    // Mock der Fetch-Funktion, um den Datenabruf zu simulieren
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    // Rendern der Komponente
    render(<GetWitz />);

    // Warten auf das Rendern der Komponente und Überprüfung der Ergebnisse
    await waitFor(() => {
      // Überprüfen, ob der Joke-Setup-Text gerendert wurde
      const setupElement = screen.getByText(
        "Why did the chicken cross the road?"
      );
      // Überprüfen, ob die Joke-Punchline gerendert wurde
      const punchlineElement = screen.getByText("To get to the other side!");

      expect(setupElement).toBeInTheDocument;
      expect(punchlineElement).toBeInTheDocument;
    });
  });

  it("should render error message if data is not fetched successfully", async () => {
    // Mock der Fetch-Funktion für den fehlgeschlagenen Datenabruf
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(),
      })
    );

    // Rendern der Komponente
    render(<GetWitz />);

    // Warten auf das Rendern der Komponente und Überprüfung der Fehlermeldung
    await waitFor(() => {
      // Überprüfen, ob die Fehlermeldung gerendert wurde
      const errorElement = screen.getByText("Fehler beim Datenabruf");

      expect(errorElement).toBeInTheDocument;
    });
  });
});
