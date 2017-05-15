import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportService } from '../_services/report.service';
import { ColorService } from '../_services/color.service';

import { AppConfig } from '../app.config';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public isDataAvailable: boolean = false;
  public dataArr: any[] = [];
  public doughnutData: any;
  public pages: number = 5;
  public extendDoughnut: boolean = false;
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
  selectedValue = this.config.dashboard.display;


  constructor(
    private reportService: ReportService,
    private colorService: ColorService,
    private config: AppConfig
  ) { }

  ngOnInit(): void {
    this.getData(this.selectedValue);
  }

  getData(timeSection: string) {
    this.reportService.getTerritoryStatistics(timeSection)
      .subscribe(data => {
        this.buildDoughnutDataArr(data);
        this.buildGridDataArr(data);

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

    if (allLength <= this.pages)
      return new Array(allLength).fill(0).map((v, i) => (i + 1) + '');

    return new Array(this.pages).fill(0).map((v, i) => {
      if (current > 2) {
        if (current + 2 >= allLength)
          return allLength - (4 - i);

        return i + current - 2 + '';
      }
      return (i + 1) + '';
    });

  }

  changeBackgroundColor(color: string): any {
    return { 'background-color': this.colorService.getColor(color, '500'), 'color': '#FFFFFF' };
  }

  toggleExtendDoughnut(): void {
    this.extendDoughnut = !this.extendDoughnut;
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Gebietskarten</title>
          
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  buildDoughnutDataArr(data: any): void {
    this.doughnutData = {
      'assigned': {
        'data': [data.assignedTerritories.length, data.notAssignedTerritories.length],
        'label': ['Aktuell Zugeteilt', 'Aktuell Nicht Zugeteilt'],
        'title': 'Aktuell Zugeteilt'
      },
      'notAssigned': {
        'data': [data.notAssignedTerritories.length, data.assignedTerritories.length],
        'label': ['Aktuell Nicht Zugeteilt', 'Aktuell Zugeteilt'],
        'title': 'Aktuell Nicht Zugeteilt'
      },
      'processed': {
        'data': [data.processedTerritories.length, data.notProcessedTerritories.length],
        'label': ['Bearbeitet', 'Unbearbeitet'],
        'title': 'Bearbeitet'
      },
      'notProcessed': {
        'data': [data.notProcessedTerritories.length, data.processedTerritories.length],
        'label': ['Unbearbeitet', 'Bearbeitet'],
        'title': 'Unbearbeitet'
      },
      'moreThanOneYearProcessing': {
        'data': [data.moreThanOneYearProcessing.length, (data.assignedTerritories.length - data.moreThanOneYearProcessing.length)],
        'label': ['> 1 Jahr zugeteilt', '< 1 Jahr zugeteilt'],
        'title': '> 1 Jahr Zugeteilt'
      },
      'moreThanSixMonthsProcessing': {
        'data': [data.moreThanSixMonthsProcessing.length, (data.assignedTerritories.length - data.moreThanSixMonthsProcessing.length)],
        'label': ['> 6 Monate zugeteilt', '< 6 Monate zugeteilt'],
        'title': '> 6 Monate Zugeteilt'
      },
      'remindBringBack': {
        'data': [data.remindBringBack.length, (data.allTerritories.length - data.oneYearNotProcessedData.length)],
        'label': ['> ' + this.config.territory.standardTime + ' Monate zugeteilt', '< ' + this.config.territory.standardTime + ' Monate zugeteilt'],
        'title': '> ' + this.config.territory.standardTime + ' Monate zugeteilt'
      },
      'oneYearNotProcessedData': {
        'data': [data.oneYearNotProcessedData.length, (data.allTerritories.length - data.oneYearNotProcessedData.length)],
        'label': ['> 1 Jahr unbearbeitet', '< 1 Jahr nicht bearbeitet'],
        'title': '> 1 Jahr Unbearbeitet'
      },
    };
  }

  buildGridDataArr(data: any): void {
    this.dataArr['assigned'] = this.getGridDataDisplayArr(data.assignedTerritories);
    this.dataArr['notAssigned'] = this.getGridDataDisplayArr(data.notAssignedTerritories);
    this.dataArr['processed'] = this.getGridDataDisplayArr(data.processedTerritories);
    this.dataArr['notProcessed'] = this.getGridDataDisplayArr(data.notProcessedTerritories);
    this.dataArr['moreThanOneYearProcessing'] = this.getGridDataDisplayArr(data.moreThanOneYearProcessing);
    this.dataArr['moreThanSixMonthsProcessing'] = this.getGridDataDisplayArr(data.moreThanSixMonthsProcessing);
    this.dataArr['oneYearNotProcessedData'] = this.getGridDataDisplayArr(data.oneYearNotProcessedData);
    this.dataArr['remindBringBack'] = this.getGridDataDisplayArr(data.remindBringBack);



  }

  getGridDataDisplayArr(territoriesArr: any): any {
    return {
      'current': 1,
      'data': territoriesArr,
      'display': territoriesArr.slice(0, 10),
      'allPages': Math.ceil(territoriesArr.length / 10),
      'pages': Math.ceil(territoriesArr.length / 10) > this.pages ?
        new Array(this.pages).fill(0).map((v, i) => (i + 1) + '') :
        new Array(Math.ceil(territoriesArr.length / 10)).fill(0).map((v, i) => (i + 1) + ''),
    };
  }
}
