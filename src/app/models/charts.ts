export interface GroupedAttributeData {
    group_name: string;
    minimum: number;
    maximum: number;
    mean: number;
    median?: number;
    q1_value?: number;
    q3_value?: number
  }

export interface BarChartInput {
    x: number[];
    y: string[];
    name: string;
    type: string;
    orientation: string;
}


