export interface GroupedAttributeData {
    group_name: string;
    minimum: number;
    maximum: number;
    mean: number;
    median?: number;
    q1_value?: number;
    q3_value?: number;
}

export interface BarChartInput {
    x: number[] | string[];
    y: number[] | string[];
    z?: number[][];
    name?: string;
    type: string;
    orientation?: string;
    marker?: Marker;
    colorscale?: string;
    hovertemplate?: string;
    text?: any;
    hoverinfo?: any;
}

export interface Marker {
    color: any[];
    colorscale?: string;
    cmin?: number;
    cmax?: number;
    reversescale?: boolean;
    showscale?: boolean;
}
