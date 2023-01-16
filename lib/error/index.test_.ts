import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage, initTestHelpers } from "next-page-tester";

initTestHelpers();

const handlers = [
  rest.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", (req, res, ctx) => {
    const prefectures = {
      message: "null",
      result: [
        {
          prefCode: 1,
          prefName: "北海道",
        },
      ],
    };
    return res(ctx.status(200), ctx.json(prefectures));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

describe("index test", () => {
  test("Should render checkbox of 北海道", async () => {
    const { page } = await getPage({
      route: "/",
    });
    render(page);
    expect(await screen.findByText("北海道")).toBeInTheDocument();
  });
});
