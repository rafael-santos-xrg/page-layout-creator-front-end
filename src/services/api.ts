export class ApiService {
  private static BASE_URL = "http://localhost:5253/api/form";

  public static async fetchGridData(): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/grid`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do grid");
    }
    return response.json();
  }

  public static async fetchFormSchema(id: number): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar o esquema do formulário com ID: ${id}`);
    }
    return response.json();
  }
}
