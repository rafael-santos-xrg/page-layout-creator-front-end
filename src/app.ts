import { ScriptSanitizer } from "./utils/scriptSanitizer";
import { TableFactory } from "./components/table";
import { StringFormatter } from "./utils/stringFormatter";
import { ButtonFactory } from "./components/button";
import { ModalFactory } from "./components/modal";
import { Dialog } from "@syncfusion/ej2-popups";
import FormBuilder from "./components/form";
import { ApiService } from "./services/api";

ScriptSanitizer.removeSyncFusionSpanScript();

let modal: Dialog | null = null;

const headers = [
  { field: "id", headerText: "Id", textAlign: "Center" },
  { field: "createdBy", headerText: "Criado Por", textAlign: "Center" },
  {
    field: "createdAt",
    headerText: "Data de Criação",
    textAlign: "Center",
    valueAccessor: (field: string, data: any) => StringFormatter.formatDatetoLocale(field, data),
  },
  {
    field: "lastModifiedAt",
    headerText: "Última Atualização",
    textAlign: "Center",
    valueAccessor: (field: string, data: any) => StringFormatter.formatDatetoLocale(field, data),
  },
  {
    field: "action",
    headerText: "Opções",
    textAlign: "Center",
    template: (data: { id: string }) =>
      ButtonFactory.createButtonAsString({
        text: "Visualizar",
        className: ["e-info"],
        attributes: [{ key: "data-id", value: data.id }],
      }),
  },
];

async function init() {
  try {
    const gridData = await ApiService.fetchGridData();

    console.log(gridData);

    const options = {
      headers: headers,
      data: gridData.data || [],
    };

    const table = TableFactory.createTable(options, "#gridContainer");
    table.appendTo("#app");

    ButtonFactory.addEventListenerToButton("#app", "click", async (event) => {
      const target = event.target as HTMLElement;

      if (target.closest("button.e-info")) {
        const id = target.getAttribute("data-id");
        console.log(id);
        if (id) {
          const schema = await ApiService.fetchFormSchema(Number(id));
          console.log(schema);
          showModal(schema.data);
        }
      }
    });
  } catch (error) {
    console.error("Erro ao inicializar:", error);
  }
}

function showModal(schema?: any) {
  const modalDiv = document.getElementById("modal") || createModalDiv();

  if (!modal) {
    modal = ModalFactory.createModal({
      header: "Formulário",
      isModal: true,
      showCloseIcon: true,
      target: "#modal",
    });
  }

  const modalContent = modalDiv.querySelector(".e-dlg-content");
  if (modalContent) {
    while (modalContent.firstChild) {
      modalContent.removeChild(modalContent.firstChild);
    }
  }

  const formBuilder = createFormBuilder(schema);
  formBuilder.appendTo("#modal .e-dlg-content");

  modal.show();
}

function createModalDiv(): HTMLElement {
  const modalDiv = document.createElement("div");
  modalDiv.setAttribute("id", "modal");
  document.body.appendChild(modalDiv);
  return modalDiv;
}

function createFormBuilder(schema: any): FormBuilder {
  return new FormBuilder({
    inputs: schema.inputs,
    onSubmit: () => {
      submitForm();
    },
  });
}

function submitForm() {
  const form = document.getElementById("dynamicForm") as HTMLFormElement;
  if (form.checkValidity()) {
    form.requestSubmit();
    modal?.hide();
  } else {
    console.log("Form inválido");
  }
}

init();
