import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Lokesh portfolio hero statement", () => {
  render(<App />);
  const heroHeading = screen.getByRole("heading", {
    name: /i build intelligent systems that reduce manual effort through automation and ai/i,
  });

  expect(heroHeading).toBeInTheDocument();
});
