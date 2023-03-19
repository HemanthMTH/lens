export class HeatMap {
    name: string;
    series: DataItem[];
    
    constructor(name: string, keys: any[], values: any[]) {
        this.name = name
        this.series = []
        for (let i = 0; i < keys.length; i++) {
            this.series.push(new DataItem(keys[i], values[i] == null ? 0 : values[i]))
          }
    }
}

export class DataItem {
    name: string | number | Date;
    value: string | number | Date;
    extra?: any;
    min?: number;
    max?: number;
    label?: string;

    constructor(name: any, value: any) {
        this.name = name
        this.value = value
    }
}