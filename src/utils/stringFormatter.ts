export class StringFormatter {
  public static formatDatetoLocale(field: string, info: any): string {
    console.log(field, info);
    const date = new Date(info[field]);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    return date.toLocaleDateString("pt-BR", options);
  }
}
