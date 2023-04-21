import { Component } from '@angular/core';
import featureImportanceData from '../../../assets/data/model/feature_importance.json';
import { BarChartInput } from 'src/app/models/charts';

@Component({
    selector: 'app-mlanalysis',
    templateUrl: './mlanalysis.component.html',
    styleUrls: ['./mlanalysis.component.scss'],
})
export class MLAnalysisComponent {
    data: BarChartInput[] = [];
    layout = {
        title: 'Logistic Regression Feature Importance',
        xaxis: {
            title: 'Importance Value',
        },
        yaxis: {
            automargin: true,
        },
		width: 1000,
		height: 600
    };

	confusionMatrixData = [
		{
		  z: [[1, 2], [26, 2]],  // replace with your own confusion matrix values
		  type: 'heatmap',
		  colorscale: 'Blues',
		  xaxis: 'x',
		  yaxis: 'y',
		  reversescale: true
		}
	  ];
	
	  confusionMatrixLayout = {
		title: 'Confusion Matrix',
		xaxis: {
		  title: 'Predicted Class',
		  tickvals: [0, 1],
		  ticktext: ['False', 'True']
		},
		yaxis: {
		  title: 'True Class',
		  tickvals: [0, 1],
		  ticktext: ['True', 'False']
		}
	  };

    constructor() {
        const values = featureImportanceData.map((t) => t.value);
        this.data = [
            {
                x: values,
                y: featureImportanceData.map((t) => t.name),
                type: 'bar',
                orientation: 'h',
                marker: {
                    color: values,
                    colorscale: 'RdBu',
                    cmin: Math.min(...values),
                    cmax: Math.max(...values),
                    reversescale: true,
                },
            },
        ];
    }
}
