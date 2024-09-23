export class ScriptSanitizer {
  public static removeSyncFuisonSpanScript(): void {
    document.addEventListener("DOMContentLoaded", () => {
      const scripts = document.querySelectorAll("script");

      if (scripts.length > 0) {
        const lastScript = scripts[scripts.length - 1];
        const divToRemove = lastScript.nextElementSibling;

        if (divToRemove && divToRemove.tagName === "DIV") {
          divToRemove.remove();
        }
      }
    });
  }
}
