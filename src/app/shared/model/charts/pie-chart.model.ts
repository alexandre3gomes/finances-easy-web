import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

export class PieChart {
    public chartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        }
    };

    public chartLabels: Label[];

    public chartData: ChartDataSets[];

    public chartType: ChartType;

    public chartLegend: true;

    constructor() {
        this.chartLabels = [];
        this.chartData = [];
        this.chartType = 'pie';
    }

    addChartData(data: ChartDataSets) {
        this.chartData.push(data);
    }

    addChartLabel(label: string) {
        this.chartLabels.push(label);
    }
}
