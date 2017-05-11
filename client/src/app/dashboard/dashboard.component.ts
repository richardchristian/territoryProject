import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportService } from '../_services/report.service';
import { ColorService } from '../_services/color.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public isDataAvailable: boolean = false;
  public dataArr: any[] = [];
  public doughnutData: any;
  public dashboardTimesection: Array<Object> = [
    { id: "OneMonth", name: "1 Monat" },
    { id: "SixMonths", name: "6 Monate" },
    { id: "Year", name: "12 Monate" },
    { id: "TwoYear", name: "Zwei Jahre" },
    { id: "ThreeYear", name: "Drei Jahre" },
    { id: "FourYear", name: "Vier Jahre" },
    { id: "FiveYear", name: "Fünf Jahre" },
    { id: "AllTime", name: "Seit Beginn" },
    { id: "CurrentServiceYear", name: "Aktuelles Dienstjahr" },
    { id: "PreviousServiceYear", name: "Vorheriges Dienstjahr" }
  ];
  selectedValue = "SixMonths";


  constructor(
    private reportService: ReportService,
    private colorService: ColorService
  ) { }

  ngOnInit(): void {
    this.getData(this.selectedValue);
  }

  getData(timeSection: string) {
    this.reportService.getTerritoryTimeSectionStatistics(timeSection)
      .subscribe(data => {
        this.doughnutData = {
          'assigned': [data.assignedTerritories.length, data.notAssignedTerritories.length],
          'notAssigned': [data.notAssignedTerritories.length, data.assignedTerritories.length],
          'processed': [data.processedTerritories.length, data.notProcessedTerritories.length],
          'notProcessed': [data.notProcessedTerritories.length, data.processedTerritories.length]
        };
        this.dataArr['assigned'] = {
          'current': 1,
          'data': data.assignedTerritories,
          'display': data.assignedTerritories.slice(0, 10),
          'allPages': Math.ceil(data.assignedTerritories.length / 10),
          'pages': Math.ceil(data.assignedTerritories.length / 10) > 10 ?
            new Array(10).fill(0).map((v, i) => (i + 1) + '') :
            new Array(Math.ceil(data.assignedTerritories.length / 10)).fill(0).map((v, i) => (i + 1) + ''),
        };
        this.dataArr['notAssigned'] = {
          'current': 1,
          'data': data.notAssignedTerritories,
          'display': data.notAssignedTerritories.slice(0, 10),
          'allPages': Math.ceil(data.notAssignedTerritories.length / 10),
          'pages': Math.ceil(data.notAssignedTerritories.length / 10) > 10 ?
            new Array(10).fill(0).map((v, i) => (i + 1) + '') :
            new Array(Math.ceil(data.notAssignedTerritories.length / 10)).fill(0).map((v, i) => (i + 1) + ''),
        };
        this.dataArr['processed'] = {
          'current': 1,
          'data': data.processedTerritories,
          'display': data.processedTerritories.slice(0, 10),
          'allPages': Math.ceil(data.processedTerritories.length / 10),
          'pages': Math.ceil(data.processedTerritories.length / 10) > 10 ?
            new Array(10).fill(0).map((v, i) => (i + 1) + '') :
            new Array(Math.ceil(data.processedTerritories.length / 10)).fill(0).map((v, i) => (i + 1) + ''),
        };
        this.dataArr['notProcessed'] = {
          'current': 1,
          'data': data.notProcessedTerritories,
          'display': data.notProcessedTerritories.slice(0, 10),
          'allPages': Math.ceil(data.notProcessedTerritories.length / 10),
          'pages': Math.ceil(data.notProcessedTerritories.length / 10) > 10 ?
            new Array(10).fill(0).map((v, i) => (i + 1) + '') :
            new Array(Math.ceil(data.notProcessedTerritories.length / 10)).fill(0).map((v, i) => (i + 1) + ''),
        };
        this.isDataAvailable = true;
      });
  }

  setPageDisplayData(name: string, page: string): any {
    var maxLength = Math.ceil(this.dataArr[name].data.length / 10);
    if (page == '-1') {
      if (this.dataArr[name].current == 1) {
        page = '1';
      } else {
        page = this.dataArr[name].current - 1 + ''
        this.dataArr[name].current--;
      }
    }
    else if (page == '+1') {
      if (this.dataArr[name].current == maxLength) {
        page = maxLength + '';
      } else {
        page = this.dataArr[name].current + 1 + ''
        this.dataArr[name].current++;
      }
    } else {
      this.dataArr[name].current = parseInt(page);
    }

    this.dataArr[name].display = this.dataArr[name].data.slice((parseInt(page) - 1) * 10, parseInt(page) * 10);
    this.dataArr[name].pages = this.getPages(name);
  }

  getPages(name: string): any {
    var allLength = Math.ceil(this.dataArr[name].data.length / 10);
    var current = this.dataArr[name].current;

    if (allLength <= 10)
      return new Array(allLength).fill(0).map((v, i) => (i + 1) + '');

    return new Array(10).fill(0).map((v, i) => {
      if (current > 5) {
        if (current + 5 >= allLength)
          return allLength - (9 - i);

        return i + current - 4 + '';
      }
      return (i + 1) + '';
    });

  }

  changeBackgroundColor(color: string): any {
    return { 'background-color': this.colorService.getColor(color, '500'), 'color': '#FFFFFF' };
  }
}
