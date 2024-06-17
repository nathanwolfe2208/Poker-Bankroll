import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  providers: [DashService],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit, OnChanges, AfterViewInit {
  title = 'ng-chart';
  chart: Chart | null = null;
  @Input()
  Sessions: any[] = [];
  bankroll: number[] = [];

  constructor(private dashService: DashService) {}

  async ngOnInit() {}

  async ngAfterViewInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            data: [0, 1, 2],
            borderColor: '#3e95cd',
            label: 'Bankroll',
            backgroundColor: 'blue',
            borderWidth: 3,
            pointStyle: false
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            max: 2000,
            min: -2000,
            beginAtZero: true,
          },
        },
        responsive: true,
      },
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.updategraph();
  }

  async updategraph() {
    if (this.chart) {
      this.bankroll = this.Sessions.reduce((acc: number[], session, index) => {
        const diff = session.cashOut - session.buyIn;
        acc.push(index === 0? diff : acc[index - 1] + diff);
        return acc;
      }, []);
      const xLabel = [];
      for(let i = 0; i < this.Sessions.length; i++){
        xLabel.push(i+1);
      }
      this.chart.data.labels = xLabel;
      this.chart.data.datasets[0].data = this.bankroll;
      this.chart.options = {
        scales: {
          y: {
            type: 'linear',
            max: Math.max(...this.bankroll) * 2,
            min: Math.min(...this.bankroll) * 2,
            beginAtZero: true,
          },
        },
        responsive: true,
      };
      this.chart.update();
    }
  }
}

class session {
  id: number = 0;
  user_id: number = 0;
  buyIn: number = 0;
  cashOut: number = 0;
  timePlayed: number = 0;
}