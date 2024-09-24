import { FormValidator } from "@syncfusion/ej2-inputs";
import { InputConfig, InputFactory } from "./input";
import { ButtonFactory } from "./button";

interface FormConfig {
  inputs: InputConfig[];
  onSubmit: (data: any) => void;
}

class FormBuilder {
  private formElement: HTMLFormElement;

  constructor(config: FormConfig) {
    this.formElement = document.createElement("form");
    this.formElement.id = "dynamicForm";

    config.inputs.forEach((inputConfig) => {
      const inputField = InputFactory.createInput(inputConfig);
      this.formElement.appendChild(inputField);
    });

    const submitButton = ButtonFactory.createButton({
      text: "Enviar",
      className: ["e-primary"],
      type: "submit",
      attributes: [{ key: "id", value: "submitBtn" }],
    });

    this.formElement.appendChild(submitButton);

    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.formElement);
      const data = Object.fromEntries(formData.entries());
      config.onSubmit(data);
    });

    new FormValidator(this.formElement);
  }

  public updateValues(values: { [key: string]: string }): void {
    for (const [key, value] of Object.entries(values)) {
      const input = this.formElement.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLSelectElement;
      if (input) {
        input.value = value;
      }
    }
  }

  public appendTo(selector: string): void {
    const container = document.querySelector(selector);
    if (container) {
      container.appendChild(this.formElement);
    }
  }
}

export default FormBuilder;
