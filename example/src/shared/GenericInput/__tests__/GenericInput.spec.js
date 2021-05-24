import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GenericInput } from "../GenericInput";
import { ThemeProvider, lightTheme } from "@strapi/design-system";

jest.mock("uuid", () => ({
  v4: () => 1,
}));

describe("GenericInput", () => {
  describe("text", () => {
    it("renders an input for type text", () => {
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="text"
            name="some text"
            id="some-id"
            label="Hello world"
            onChange={() => {}}
          />
        </ThemeProvider>
      );

      expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          class="sc-Arkif cqHgOr"
        >
          <div>
            <div
              class="sc-efHYUO cwLEVt"
            >
              <div
                class="sc-fujyAs iDPWRy"
              >
                <label
                  class="sc-eCApnc XCYtb"
                  for="field-some-id"
                >
                  Hello world
                </label>
              </div>
              <div
                class="sc-fujyAs sc-dIvrsQ hbgaeN bldbdh"
              >
                <input
                  aria-invalid="false"
                  class="sc-iemWCZ cIJrJM"
                  id="field-some-id"
                  name="some text"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      `);
    });

    it("retrieves a string on change", async () => {
      const onChangeSpy = jest.fn();

      render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="text"
            name="some text"
            id="some-id"
            label="Hello world"
            onChange={onChangeSpy}
          />
        </ThemeProvider>
      );

      const input = await waitFor(() => screen.getByLabelText("Hello world"));

      fireEvent.change(input, { target: { value: "hello moto" } });

      expect(onChangeSpy).toBeCalledWith("hello moto");
    });
  });

  describe("checkbox", () => {
    it("renders a checkbox for type checkbox", () => {
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="checkbox"
            name="some text"
            id="some-id"
            label="Hello world"
            onChange={() => {}}
          />
        </ThemeProvider>
      );

      expect(container.firstChild).toMatchInlineSnapshot(`
          <label
            class="sc-eCApnc sc-fFSPTT imgJpN bwVixM"
          >
            <input
              class="sc-ksluID bLZHCe"
              id="default"
              name="some text"
              type="checkbox"
            />
            <div
              class="sc-bdnxRM cpgqnJ"
            >
              Hello world
            </div>
          </label>
        `);
    });

    it("retrieves a boolean value when calling onChange", () => {
      const onChangeSpy = jest.fn();

      render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="checkbox"
            name="some text"
            id="some-id"
            label="Hello world"
            onChange={onChangeSpy}
            value={false}
          />
        </ThemeProvider>
      );

      const input = screen.getByLabelText("Hello world");

      fireEvent.click(input);

      expect(onChangeSpy).toBeCalledWith(true);
    });
  });
});
