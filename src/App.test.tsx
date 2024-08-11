import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Тестирование компонента App", () => {
  test("Компонент отрисовывает контент", () => {
    render(<App />);
    expect(screen.queryByTestId("section-wipers")).toBeDefined();
  });
});
