import * as React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { lightTheme, ThemeProvider } from "@strapi/parts";
import Wysiwyg from "../";

document.createRange = () => {
  const range = new Range();
  range.getBoundingClientRect = jest.fn();
  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
  }));
  return range;
};
window.focus = jest.fn();

describe("Wysiwyg", () => {
  let renderedContainer; 
  let getContainerByText; 
  let containerQueryByText; 

  beforeEach(() => { 
    const { container, getByText, queryByText } = render( 
      <ThemeProvider theme={lightTheme}> 
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} /> 
      </ThemeProvider> 
    ); 
    renderedContainer = container; 
    getContainerByText = getByText; 
    containerQueryByText = queryByText; 
  });

  it("should render the Wysiwyg", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));

    expect(getContainerByText("hello world")).toBeInTheDocument();
    expect(renderedContainer.firstChild).toMatchInlineSnapshot(`
      <span
        class="sc-hKFxyN sc-jSFjdj jMHwLp hPodxf"
      >
        hello world
      </span>
    `);
  });

  it("should render bold markdown when clicking the bold button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Bold"));

    expect(getContainerByText("**Bold**")).toBeInTheDocument();
  });

  it("should render italic markdown when clicking the italic button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Italic"));

    expect(getContainerByText("_Italic_")).toBeInTheDocument();
  });

  it("should render underline markdown when clicking the underline button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Underline"));

    const hasUnderlineMarkdown = getContainerByText((content, node) => {
      const hasText = (node) => node.textContent === "<u>Underline</u>";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });

    expect(hasUnderlineMarkdown).toBeInTheDocument();
  });

  it("should render strikethrough markdown when clicking the strikethrough button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Strikethrough"));

    expect(getContainerByText("~~Strikethrough~~")).toBeInTheDocument();
  });

  it("should render bullet list markdown when clicking the bullet list button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#BulletList"));

    expect(getContainerByText("-")).toBeInTheDocument();
  });

  it("should render number list markdown when clicking the number list button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#NumberList"));

    expect(getContainerByText("1.")).toBeInTheDocument();
  });

  it("should render code markdown when clicking the code button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Code"));

    expect(getContainerByText("```Code```")).toBeInTheDocument();
  });

  it("should render image markdown when clicking the image button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Image"));

    expect(getContainerByText("[alt]()")).toBeInTheDocument();
  });

  it("should render link markdown when clicking the link button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Link"));

    expect(getContainerByText("[Link](link)")).toBeInTheDocument();
  });

  it("should render quote markdown when clicking the quote button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.click(renderedContainer.querySelector("#Quote"));

    expect(getContainerByText(">Quote")).toBeInTheDocument();
  });

  it("should render h1 markdown when clicking the h1 button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h1"));

    expect(getContainerByText("#")).toBeInTheDocument();
  });

  it("should render h2 markdown when clicking the h2 button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h2"));

    expect(getContainerByText("##")).toBeInTheDocument();
  });

  it("should render h3 markdown when clicking the h3 button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h3"));

    expect(getContainerByText("###")).toBeInTheDocument();
  });

  it("should render h4 markdown when clicking the h4 button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h4"));

    expect(getContainerByText("####")).toBeInTheDocument();
  });

  it("should render h5 markdown when clicking the h5 button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h5"));

    expect(getContainerByText("#####")).toBeInTheDocument();
  });

  it("should render h6 markdown when clicking the h6 button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h6"));

    expect(getContainerByText("######")).toBeInTheDocument();
  });

  it("should render h1 markdown when clicking the h4 button then clicking on the h1 button", async () => {
    await waitFor(() => renderedContainer.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h1"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h4"));
    fireEvent.mouseDown(renderedContainer.querySelector("#selectTitle"));
    fireEvent.click(getContainerByText("h1"));

    expect(containerQueryByText("####")).not.toBeInTheDocument();
    expect(getContainerByText("#")).toBeInTheDocument();
  });
});
