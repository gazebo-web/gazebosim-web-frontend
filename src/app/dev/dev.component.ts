import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { BenchmarkService } from './benchmark.service';
import { Series } from './series';
import { MomentModule } from 'angular2-moment';
import { BenchmarkDateData } from './benchmark-date-data';
import * as moment from 'moment';

@Component({
  selector: 'gz-dev',
  templateUrl: 'dev.component.html',
  styleUrls: ['dev.component.scss']
})

export class DevComponent implements OnInit {
  public series: Series[];

  public selectedLib: number;
  public selectedBenchmark: string;

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Date';
  public showYAxisLabel = true;
  public yAxisLabel = 'Duration (ms)';
  public autoScale = false;
  public timeline = false;
  public multi: any[];

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  public benchmarkTableData: MatTableDataSource<BenchmarkDateData>;
  public benchmarkTableColumns = ['Name', 'CPU Time', 'Real Time'];
  public dates: string[];
  public selectedDate: string;

  constructor(private benchmarkService: BenchmarkService,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.series = this.route.snapshot.data['benchmarkInfo'];
  }

  public onLibChange(): void {
    this.benchmarkService.getBenchmarkDates(this.series[this.selectedLib].name).subscribe(
      (response) => { this.dates = response; }
    );
  }

  public onDateChange(): void {
    this.benchmarkService.getBenchmarkByDate(
      this.series[this.selectedLib].name, this.selectedDate).subscribe(
        (response) => {
          this.benchmarkTableData = new MatTableDataSource(response);
        }
      );
  }

  public onSeriesChange(): void {
    this.benchmarkService.getBenchmarks(this.series[this.selectedLib].name,
      this.selectedBenchmark).subscribe(
      (data) => {
        this.multi = data;
      }
    );
  }

  public dateTickFormatting(val: any): string {
    return moment(val).format('D MMM YY, H:mm');
  }
}
