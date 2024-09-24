import { TextBox } from "@syncfusion/ej2-inputs";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { RadioButton } from "@syncfusion/ej2-buttons";
import { NumericTextBox } from "@syncfusion/ej2-inputs";
import { DatePicker } from "@syncfusion/ej2-calendars";

export interface InputConfig {
  type: string;
  label: string;
  name: string;
  value?: string;
  options?: string[];
  radioOptions?: { label: string; value: string }[];
}

export class InputFactory {
  public static createInput(inputConfig: InputConfig): HTMLElement {
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("form-group", `${inputConfig.type}`);

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

        new TextBox({ value: inputConfig.value || "", placeholder: inputConfig.label, floatLabelType: "Auto" }, inputElement as HTMLInputElement);
        break;

      case "select":
        inputElement = document.createElement("input");
        inputElement.setAttribute("id", inputConfig.name);
        inputElement.setAttribute("name", inputConfig.name);
        inputWrapper.appendChild(inputElement);

        new DropDownList(
          {
            dataSource: inputConfig.options || [],
            value: inputConfig.value,
            placeholder: inputConfig.label,
            floatLabelType: "Auto",
          },
          inputElement
        );
        break;

      case "radio":
        const mainLabel = document.createElement("label");
        mainLabel.setAttribute("for", inputConfig.name);
        mainLabel.textContent = inputConfig.label + " :";
        inputWrapper.appendChild(mainLabel);

        inputConfig.radioOptions?.forEach((option, index) => {
          const radioInput = document.createElement("input");
          radioInput.setAttribute("type", "radio");
          radioInput.setAttribute("id", `${inputConfig.name}_${index}`);
          radioInput.setAttribute("name", inputConfig.name);
          radioInput.setAttribute("value", option.value);
          inputWrapper.appendChild(radioInput);

          const radioLabel = document.createElement("label");
          radioLabel.setAttribute("for", `${inputConfig.name}_${index}`);
          radioLabel.textContent = option.label;
          inputWrapper.appendChild(radioLabel);

          new RadioButton({
            label: option.label,
            value: option.value,
            checked: inputConfig.value === option.value,
          });
        });
        break;

      case "number":
        inputElement = document.createElement("input");
        inputElement.setAttribute("id", inputConfig.name);
        inputElement.setAttribute("name", inputConfig.name);
        inputWrapper.appendChild(inputElement);

        new NumericTextBox(
          {
            value: inputConfig.value ? parseFloat(inputConfig.value) : undefined,
            placeholder: inputConfig.label,
            floatLabelType: "Auto",
          },
          inputElement as HTMLInputElement
        );
        break;

      case "date":
        inputElement = document.createElement("input");
        inputElement.setAttribute("id", inputConfig.name);
        inputElement.setAttribute("name", inputConfig.name);
        inputWrapper.appendChild(inputElement);

        new DatePicker(
          {
            value: inputConfig.value ? new Date(inputConfig.value) : undefined,
            placeholder: inputConfig.label,
            floatLabelType: "Auto",
          },
          inputElement as HTMLInputElement
        );
        break;

      default:
        throw new Error(`Unsupported input type: ${inputConfig.type}`);
    }

    return inputWrapper;
  }
}
