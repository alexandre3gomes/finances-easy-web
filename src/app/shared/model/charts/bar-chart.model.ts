import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';


export class BarChart {

	public chartOptions: ChartOptions = {
		responsive: true,
		scales: { xAxes: [{}], yAxes: [{}] },
		legend: { display: true },
		plugins: {
			datalabels: {
				anchor: 'end',
				align: 'end',
			}
		}
	};
	public chartLabels: Label[];
	public chartData: ChartDataSets[];
	public chartType: ChartType;
	public chartLegend: true;

	constructor() {
		this.chartLabels = [];
		this.chartData = [];
		this.chartType = 'bar';
	}


	addChartData(data: ChartDataSets) {
		this.chartData.push(data);
	}

	addChartLabel(label: Label) {
		this.chartLabels.push(label);
	}
}
