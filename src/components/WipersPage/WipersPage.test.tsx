import { render, screen, waitFor } from "@testing-library/react";
import { WipersPage } from "./WipersPage";
import { api } from "../../api";

jest.mock("axios");
jest.mock("../../api");

const mockBrands = [
  {
    id: 3,
    name: "brand1",
    link: "",
  },
  {
    id: 4,
    name: "brand2",
    link: "",
  },
];

describe("Тестирование компонента WipersPage", () => {
  test("Компонент делает запрос и отрисовывает список брендов", async () => {
    (api.getBrandsAuto as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve({ data: mockBrands });
    });
    render(<WipersPage />);
    expect(api.getBrandsAuto).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryAllByTestId("content-auto-item")).toHaveLength(
        mockBrands.length
      );
    });
  });
});
