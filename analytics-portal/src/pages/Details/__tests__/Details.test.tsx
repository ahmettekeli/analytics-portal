import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Details from "../Details";

//TODO - add tests
describe("Detail", () => {
  test("dummy test", () => {
    expect(true).toBe(true);
  });
  //   let renderResult: ReturnType<typeof render>;
  //   beforeEach(() => {
  //     renderResult = render(
  //       <MemoryRouter initialEntries={["/overview/id"]}>
  //         <Details />
  //       </MemoryRouter>
  //     );
  //   });
  //   afterEach(cleanup);

  //   test("Renders Detail component", async () => {
  //     expect(renderResult.getByTestId("details")).toBeInTheDocument();
  //   });

  //   test("Detail matches snapshot", () => {
  //     const tree = renderer
  //       .create(
  //         <MemoryRouter initialEntries={["/overview/id"]}>
  //           <Details />
  //         </MemoryRouter>
  //       )
  //       .toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });
});
