import { render, screen } from "@testing-library/react";
import GetWitz from "../src/components/GetWitz";


describe("GetWitz", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render joke setup and punchline if data is fetched successfully", async () => {
    const mockData = {
      setup: "Why did the chicken cross the road?",
      punchline: "To get to the other side!",
    };

    render(<GetWitz />);

    const setupElement = await screen.findByText(mockData.setup);
    const punchlineElement = await screen.findByText(mockData.punchline);

    expect(setupElement).toBeInTheDocument();
    expect(punchlineElement).toBeInTheDocument();
  });

  it("should handle data fetch error", async () => {
    const mockError = new Error("Data fetch error");
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockError)
    );

    render(<GetWitz />);

    const errorElement = await screen.findByText("Fehler beim Datenabruf:");
    expect(errorElement).toBeInTheDocument();
  });
});
