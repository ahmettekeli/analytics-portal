import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Breadcrumbs from "../Breadcrumbs";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";

describe("Breadcrumbs", () => {
  let renderResult: ReturnType<typeof render>;
  beforeEach(() => {
    renderResult = render(
      <Router>
        <Breadcrumbs />
      </Router>
    );
  });
  afterEach(cleanup);

  test("Renders Breadcrumbs component", () => {
    expect(renderResult.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  test("Breadcrumbs to show home only", () => {
    expect(renderResult.getByText("Home")).toBeInTheDocument();
  });

  test("Breadcrumbs to show home/overview only", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={["/home/overview"]}>
        <Breadcrumbs />
      </MemoryRouter>
    );
    expect(renderResult.getByText("Overview")).toBeInTheDocument();
  });

  test("Breadcrumbs to show home/overview/:name only", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={["/home/overview/test"]}>
        <Breadcrumbs />
      </MemoryRouter>
    );
    expect(renderResult.getByText("Test")).toBeInTheDocument();
  });

  test("Breadcrumbs to show 404", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={["/404"]}>
        <Breadcrumbs />
      </MemoryRouter>
    );
    expect(renderResult.getByText("404")).toBeInTheDocument();
  });

  test("Breadcrumbs matches snapshot", () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/home/overview/test"]}>
          <Breadcrumbs />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
