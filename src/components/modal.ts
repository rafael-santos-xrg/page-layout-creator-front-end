import { Dialog } from "@syncfusion/ej2-popups";

interface ModalOptions {
  header?: string;
  content?: string | HTMLElement;
  buttons?: Array<{ click: () => void; buttonModel: { content: string; isPrimary?: boolean } }>;
  width?: string;
  height?: string;
  isModal?: boolean;
  showCloseIcon?: boolean;
  target?: HTMLElement | string;
}

export class ModalFactory {
  public static createModal(options: ModalOptions): Dialog {
    const dialog = new Dialog({
      header: options.header || "Default Header",
      content: options.content || "Default Content",
      buttons: options.buttons || [],
      width: options.width || "300px",
      height: options.height || "200px",
      isModal: options.isModal !== undefined ? options.isModal : true,
      showCloseIcon: options.showCloseIcon !== undefined ? options.showCloseIcon : true,
    });

    if (typeof options.target === "string") {
      const targetElement = document.querySelector(options.target);
      if (targetElement) {
        dialog.appendTo(targetElement as HTMLElement);
      } else {
        console.error(`Elemento com o seletor "${options.target}" não encontrado.`);
      }
    } else if (options.target instanceof HTMLElement) {
      dialog.appendTo(options.target);
    }

    return dialog;
  }
}
