import { TextBox } from "@syncfusion/ej2-inputs";
import { DropDownList } from "@syncfusion/ej2-dropdowns";

interface InputConfig {
  type: string;
  label: string;
  name: string;
  value?: string;
  options?: string[];
}

export class InputFactory {
  public static createInput(inputConfig: InputConfig): HTMLElement {
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("form-group");

    const label = document.createElement("label");
    label.setAttribute("for", inputConfig.name);
    label.textContent = inputConfig.label;

    inputWrapper.appendChild(label);

    let inputElement: HTMLElement;

    switch (inputConfig.type) {
      case "text":
      case "email":
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", inputConfig.type);
        inputElement.setAttribute("id", inputConfig.name);
        inputElement.setAttribute("name", inputConfig.name);
        inputElement.setAttribute("value", inputConfig.value || "");
        inputWrapper.appendChild(inputElement);

        new TextBox({ value: inputConfig.value || "" }, inputElement as HTMLInputElement);
        break;

      case "select":
        inputElement = document.createElement("input");
        inputElement.setAttribute("id", inputConfig.name);
        inputElement.setAttribute("name", inputConfig.name);
        inputWrapper.appendChild(inputElement);

        console.log(inputConfig);

        new DropDownList(
          {
            dataSource: inputConfig.options || [],
            value: inputConfig.value,
          },
          inputElement
        );
        break;

      default:
        throw new Error(`Unsupported input type: ${inputConfig.type}`);
    }

    return inputWrapper;
  }
}
