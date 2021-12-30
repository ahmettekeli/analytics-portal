import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Details from "../Details";

//TODO - add tests
describe("Detail", () => {
  test("Renders Detail component", () => {});

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
