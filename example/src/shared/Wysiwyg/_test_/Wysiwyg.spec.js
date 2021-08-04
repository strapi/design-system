import * as React from "react";
import { render, waitFor, prettyDOM, fireEvent } from "@testing-library/react";
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
  it("should render the Wysiwyg", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));

    expect(getByText("hello world")).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span
        class="sc-hKFxyN sc-jSFjdj jMHwLp hPodxf"
      >
        hello world
      </span>
    `);
  });

  it("should render bold markdown when clicking the bold button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Bold"));

    expect(getByText("**Bold**")).toBeInTheDocument();
  });

  it("should render italic markdown when clicking the italic button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Italic"));

    expect(getByText("_Italic_")).toBeInTheDocument();
  });

  it("should render underline markdown when clicking the underline button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Underline"));

    const hasUnderlineMarkdown = getByText((content, node) => {
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
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Strikethrough"));

    expect(getByText("~~Strikethrough~~")).toBeInTheDocument();
  });

  it("should render bullet list markdown when clicking the bullet list button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#BulletList"));

    expect(getByText("-")).toBeInTheDocument();
  });

  it("should render number list markdown when clicking the number list button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#NumberList"));

    expect(getByText("1.")).toBeInTheDocument();
  });

  it("should render code markdown when clicking the code button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Code"));

    expect(getByText("```Code```")).toBeInTheDocument();
  });

  it("should render image markdown when clicking the image button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Image"));

    expect(getByText("[alt]()")).toBeInTheDocument();
  });

  it("should render link markdown when clicking the link button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Link"));

    expect(getByText("[Link](link)")).toBeInTheDocument();
  });

  it("should render quote markdown when clicking the quote button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.click(container.querySelector("#Quote"));

    expect(getByText(">Quote")).toBeInTheDocument();
  });

  it("should render h1 markdown when clicking the h1 button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h1"));

    expect(getByText("#")).toBeInTheDocument();
  });

  it("should render h2 markdown when clicking the h2 button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h2"));

    expect(getByText("##")).toBeInTheDocument();
  });

  it("should render h3 markdown when clicking the h3 button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h3"));

    expect(getByText("###")).toBeInTheDocument();
  });

  it("should render h4 markdown when clicking the h4 button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h4"));

    expect(getByText("####")).toBeInTheDocument();
  });

  it("should render h5 markdown when clicking the h5 button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h5"));

    expect(getByText("#####")).toBeInTheDocument();
  });

  it("should render h6 markdown when clicking the h6 button", async () => {
    const { container, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h6"));

    expect(getByText("######")).toBeInTheDocument();
  });

  it("should render h1 markdown when clicking the h4 button then clicking on the h1 button", async () => {
    const { container, queryByText, getByText } = render(
      <ThemeProvider theme={lightTheme}>
        <Wysiwyg label={"hello world"} placeholder={""} onChange={jest.fn()} />
      </ThemeProvider>
    );

    await waitFor(() => container.querySelector(".CodeMirror-cursor"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h1"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h4"));
    fireEvent.mouseDown(container.querySelector("#selectTitle"));
    fireEvent.click(getByText("h1"));

    expect(queryByText("####")).not.toBeInTheDocument();
    expect(getByText("#")).toBeInTheDocument();
  });
});
