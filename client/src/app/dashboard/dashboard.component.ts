import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportService } from '../_services/report.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public isDataAvailable: boolean = false;
  public dataArr: number[];
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


  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getData(this.selectedValue);
  }

  getData(timeSection: string) {
    console.log(timeSection);
    this.reportService.getTerritoryTimeSectionStatistics(timeSection)
      .subscribe(data => {
        console.log(data);
        this.doughnutData = {
          'assigned': [data.assignedTerritories.length, data.notAssignedTerritories.length],
          'notAssigned': [data.notAssignedTerritories.length, data.assignedTerritories.length],
          'processed': [data.processedTerritories.length, data.notProcessedTerritories.length],
          'notProcessed': [data.notProcessedTerritories.length, data.processedTerritories.length]
        }
        this.isDataAvailable = true;
      });
  }
}
