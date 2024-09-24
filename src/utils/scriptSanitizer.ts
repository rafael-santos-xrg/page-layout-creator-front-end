export class ScriptSanitizer {
  public static removeSyncFusionSpanScript(): void {
    document.addEventListener("DOMContentLoaded", () => {
      const observer = new MutationObserver(() => {
        const scripts = document.querySelectorAll("script");

        if (scripts.length > 0) {
          const lastScript = scripts[scripts.length - 1];
          const divToRemove = lastScript.nextElementSibling;

          console.log(divToRemove);

          if (divToRemove && divToRemove.tagName === "DIV") {
            divToRemove.remove();
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => observer.disconnect(), 100);
    });
  }
}
