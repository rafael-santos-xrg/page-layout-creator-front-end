import { ScriptSanitizer } from "./utils/scriptSanitizer";
import { TableFactory } from "./components/table";
import { StringFormatter } from "./utils/stringFormatter";
import { ButtonFactory } from "./components/button";
import { ModalFactory } from "./components/modal";
import { Dialog } from "@syncfusion/ej2-popups";

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
      template: (data: { ID: string }) => {
        return ButtonFactory.createButtonAsString({
          text: "Visualizar",
          className: ["e-info"],
          atributes: [
            {
              key: "data-id",
              value: data.ID,
            },
          ],
        });
      },
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

ButtonFactory.addEventListenerToButton("#app", "click", (event) => {
  const modalDiv = document.createElement("div");
  modalDiv.setAttribute("id", "modal");
  document.body.appendChild(modalDiv);
  const target = event.target as HTMLElement;

  if (target.closest("button.e-info")) {
    const id = target.getAttribute("data-id");
    if (id) {
      if (!modal) {
        modal = ModalFactory.createModal({
          header: "Exemplo de Modal",
          content: `ID do item selecionado: ${id}`,
          buttons: [
            {
              click: () => {
                alert("Botão 1 clicado");
              },
              buttonModel: { content: "Botão 1", isPrimary: true },
            },
            {
              click: () => {
                alert("Botão 2 clicado");
              },
              buttonModel: { content: "Botão 2" },
            },
          ],
          width: "400px",
          height: "250px",
          isModal: true,
          showCloseIcon: true,
          target: "#modal",
        });
      } else {
        modal.content = `ID do item selecionado: ${id}`;
      }
      modal.show();
    }
  }
});
