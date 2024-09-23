import { ColumnModel, Grid, Page } from "@syncfusion/ej2-grids";

interface Column {
  field: string;
  headerText: string;
  width?: number | string;
}

interface PageSettings {
  pageSize: number;
}

interface TableOptions {
  headers: Column[] | string[] | ColumnModel[];
  data: Array<Record<string, any>>;
  allowPaging?: boolean;
  pageSettings?: PageSettings;
  onRowClick?: (id: string) => void;
}

export class TableFactory {
  private grid: Grid;

  private constructor(options: TableOptions, element: string) {
    const headers = options.headers;
    const data = options.data;
    const allowPaging = options.allowPaging ?? false;
    const pageSettings = options.pageSettings ?? { pageSize: 20 };

    Grid.Inject(Page);

    this.grid = this.initializeTable(headers, data, allowPaging, pageSettings);
    this.appendTo(element);
  }

  private initializeTable(headers: Column[] | string[] | ColumnModel[], data: Array<Record<string, any>>, allowPaging: boolean, pageSettings: PageSettings): Grid {
    return new Grid({
      dataSource: data,
      columns: headers,
      allowPaging: allowPaging,
      pageSettings: pageSettings,
    });
  }

  public appendTo(element: string): void {
    this.grid.appendTo(element);
  }

  public static createTable(options: TableOptions, element: string): TableFactory {
    return new TableFactory(options, element);
  }
}
