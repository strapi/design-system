import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GenericInput } from "../GenericInput";
import { ThemeProvider, lightTheme } from "@strapi/design-system";

describe("GenericInput", () => {
  describe("unmatched type", () => {
    let rawConsoleError;

    beforeEach(() => {
      // Hides the error message thrown by PropTypes preventing the test from giving an error in the logs
      rawConsoleError = console.error;
      console.error = () => undefined;
    });

    afterEach(() => {
      console.error = rawConsoleError;
    });

    it("returns nothing when the type does not match any predicted ones", () => {
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="not existing type"
            name="some text"
            label="Hello world"
          />
        </ThemeProvider>
      );

      expect(container.firstChild).toBe(null);
    });
  });

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
            id="some-id"
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

  describe("radio", () => {
    it("renders a radio for type radio", () => {
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="radio"
            name="favorite-plate"
            onChange={() => {}}
            options={[
              { label: "Pizza", value: "pizza" },
              { label: "Bagel", value: "bagel" },
            ]}
          />
        </ThemeProvider>
      );

      expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          role="radiogroup"
        >
          <label
            class="sc-eCApnc sc-jcwpoC imgJpN jaONGg"
          >
            <input
              aria-checked="false"
              class="sc-hBMUJo kaPkmY"
              name="favorite-plate"
              tabindex="0"
              type="radio"
              value="pizza"
            />
            <div
              class="sc-bdnxRM cpgqnJ"
            >
              Pizza
            </div>
          </label>
          <label
            class="sc-eCApnc sc-jcwpoC imgJpN jaONGg"
          >
            <input
              aria-checked="false"
              class="sc-hBMUJo kaPkmY"
              name="favorite-plate"
              tabindex="-1"
              type="radio"
              value="bagel"
            />
            <div
              class="sc-bdnxRM cpgqnJ"
            >
              Bagel
            </div>
          </label>
        </div>
      `);
    });

    it("retrieves a boolean value when calling onChange", () => {
      const onChangeSpy = jest.fn();

      render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="radio"
            name="favorite-plate"
            onChange={onChangeSpy}
            options={[
              { label: "Pizza", value: "pizza" },
              { label: "Bagel", value: "bagel" },
            ]}
          />
        </ThemeProvider>
      );

      const bagel = screen.getByLabelText("Bagel");

      fireEvent.click(bagel);

      expect(onChangeSpy).toBeCalledWith("bagel");
    });
  });

  describe("textarea", () => {
    it("renders an input for type text", () => {
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <GenericInput
            type="textarea"
            name="long-content"
            id="some-id"
            label="Hello world"
            onChange={() => {}}
          />
        </ThemeProvider>
      );

      expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          class="sc-khIgEk fvOCv"
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
                <textarea
                  aria-invalid="false"
                  class="sc-iemWCZ cIJrJM"
                  id="field-some-id"
                  name="long-content"
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
            type="textarea"
            name="long-content"
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
});
