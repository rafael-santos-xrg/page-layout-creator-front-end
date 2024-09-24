import { ScriptSanitizer } from "./utils/scriptSanitizer";
import { TableFactory } from "./components/table";
import { StringFormatter } from "./utils/stringFormatter";
import { ButtonFactory } from "./components/button";
import { ModalFactory } from "./components/modal";
import { Dialog } from "@syncfusion/ej2-popups";
import FormBuilder from "./components/form";

ScriptSanitizer.removeSyncFuisonSpanScript();

let modal: Dialog | null = null;

const options = {
  headers: [
    { field: "ID", headerText: "Id", textAlign: "Center" },
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
      template: (data: { ID: string }) =>
        ButtonFactory.createButtonAsString({
          text: "Visualizar",
          className: ["e-info"],
          attributes: [{ key: "data-id", value: data.ID }],
        }),
    },
  ],
  data: [
    { ID: 1, createdBy: "Rafael", createdAt: "2024-09-22", lastModifiedAt: "2024-09-23" },
    { ID: 2, createdBy: "João", createdAt: "2024-09-21", lastModifiedAt: "2024-09-22" },
    { ID: 3, createdBy: "Maria", createdAt: "2024-09-20", lastModifiedAt: "2024-09-21" },
    { ID: 4, createdBy: "Ana", createdAt: "2024-09-19", lastModifiedAt: "2024-09-20" },
    { ID: 5, createdBy: "Pedro", createdAt: "2024-09-18", lastModifiedAt: "2024-09-19" },
  ],
};

const table = TableFactory.createTable(options, "#gridContainer");
table.appendTo("#app");

// Criação de um formulário inicial
new FormBuilder({
  inputs: [
    { type: "text", label: "Nome", name: "name" },
    { type: "email", label: "Email", name: "email" },
    { type: "text", label: "ID", name: "id" },
    { type: "select", label: "Opções", name: "options", options: ["Opção 1", "Opção 2"] },
  ],
  onSubmit: (data) => {
    alert(`Formulário enviado com sucesso! Dados: ${JSON.stringify(data)}`);
  },
});

// Adiciona um EventListener para o botão de "Visualizar"
ButtonFactory.addEventListenerToButton("#app", "click", (event) => {
  const target = event.target as HTMLElement;

  if (target.closest("button.e-info")) {
    const id = target.getAttribute("data-id");
    if (id) {
      showModal(id);
    }
  }
});

function showModal(id?: string) {
  const modalDiv = document.getElementById("modal") || createModalDiv();

  if (!modal) {
    modal = ModalFactory.createModal({
      header: "Exemplo de Modal",
      content: "",
      buttons: [
        {
          click: submitForm,
          buttonModel: { content: "Enviar", isPrimary: true },
        },
        {
          click: closeModal,
          buttonModel: { content: "Cancelar" },
        },
      ],
      width: "400px",
      height: "auto",
      isModal: true,
      showCloseIcon: true,
      target: "#modal",
    });
  }

  const modalContent = modalDiv.querySelector(".e-dlg-content");
  if (modalContent) {
    modalContent.innerHTML = "";
  }

  const formBuilder = createFormBuilder(id);
  formBuilder.appendTo("#modal .e-dlg-content");

  modal.show();
}

function createModalDiv(): HTMLElement {
  const modalDiv = document.createElement("div");
  modalDiv.setAttribute("id", "modal");
  document.body.appendChild(modalDiv);
  return modalDiv;
}

function createFormBuilder(id?: string): FormBuilder {
  return new FormBuilder({
    inputs: [
      { type: "text", label: "Nome", name: "name" },
      { type: "email", label: "Email", name: "email" },
      { type: "text", label: "ID", name: "id", value: id || "" },
      { type: "select", label: "Opções", name: "options", options: ["Opção 1", "Opção 2"] },
    ],
    onSubmit: (data) => {
      alert(`Formulário enviado com sucesso! Dados: ${JSON.stringify(data)}`);
    },
  });
}

function submitForm() {
  const form = document.getElementById("dynamicForm") as HTMLFormElement;
  if (form.checkValidity()) {
    form.requestSubmit();
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
}

function closeModal() {
  modal?.hide();
  modal?.destroy();
  document.getElementById("modal")?.remove();
  modal = null;
}
