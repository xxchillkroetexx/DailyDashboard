import { render, screen, waitFor } from "@testing-library/react";
import GetWitz from "../src/components/GetWitz";
import React from "react";

describe("GetWitz", () => {
  it("should render joke setup and punchline if data is fetched successfully", async () => {
    const mockData = {
      setup: "Why did the chicken cross the road?",
      punchline: "To get to the other side!",
    };

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    render(<GetWitz />);

    await waitFor(() => {
      const setupElement = screen.getByText("Why did the chicken cross the road?");
      const punchlineElement = screen.getByText("To get to the other side!");

      expect(setupElement).toBeInTheDocument;
      expect(punchlineElement).toBeInTheDocument;
    });
  });


  it("should render error message if data is not fetched successfully", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve()
      })
    );

    render(<GetWitz />);

    await waitFor(() => {
      const errorElement = screen.getByText("Fehler beim Datenabruf");

      expect(errorElement).toBeInTheDocument;
    });
  }
  );
});
