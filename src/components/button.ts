interface ButtonOptions {
  text: string;
  className?: Array<"e-primary" | "e-success" | "e-danger" | "e-warning" | "e-info" | "e-link" | string>;
  attributes?: Array<{ key: string; value: string }>;
  onClick?: (id?: string) => void;
  type?: "button" | "submit" | "reset";
  style?: Record<string, string>;
  id?: string;
}

export class ButtonFactory {
  public static createButton(options: ButtonOptions): HTMLButtonElement {
    const button = document.createElement("button");

    button.textContent = options.text;
    button.type = options.type || "button";

    if (options.className) {
      button.classList.add("e-btn", ...options.className);
    }

    if (options.style) {
      Object.keys(options.style).forEach((key: string) => {
        button.style.setProperty(key, options.style![key]);
      });
    }

    if (options.attributes) {
      options.attributes.forEach(({ key, value }) => {
        button.setAttribute(key, value);
      });
    }

    return button;
  }

  public static createButtonAsString(options: ButtonOptions): string {
    const button = this.createButton(options);
    return button.outerHTML;
  }

  public static addEventListenerToButton(containerSelector: string, eventType: string, callback: (event: Event) => void): void {
    const container = document.querySelector(containerSelector);
    if (container) {
      container.addEventListener(eventType, callback);
    }
  }
}
