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
    x: number[] | string[];
    y: number[] | string[];
    name: string;
    type: string;
    orientation?: string;
    marker?: Marker
}

export interface Marker{
  color: string[]
}

