import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2TableModule } from 'ng2-table';
import { ColorService } from '../_services/color.service';

import { ReportService } from '../_services/report.service';
@Component({
    selector: 'reports-currentdata',
    templateUrl: './reports-currentdata.component.html'
})
export class ReportsCurrentdataComponent implements OnInit {
    public dataArr: any;
    public isDataAvailable: boolean = false;
    public targetDates: any;

    constructor(
        public toastr: ToastsManager,
        private colorService: ColorService,
        private reportService: ReportService
    ) { }

    public ngOnInit(): void {
        this.reportService.getTerritoryStatistics()
            .subscribe(data => {
                this.dataArr = data;
                this.targetDates = data.targetDates;
                this.isDataAvailable = true;
            });
    }

    changeBackgroundColor(color: string): any {
        return { 'background-color': this.colorService.getColor(color, '400'), 'color': '#000000' };
    }

    getLineBackgroundColor(lineData: any): string {
        var color = 'white';
        if (lineData.from === undefined)
            color = 'red';
        else {
            if (lineData.from < this.targetDates.greaterFourMonths)
                color = 'yellow';
            if (lineData.from < this.targetDates.greaterSixMonths)
                color = 'red';
            if (lineData.from < this.targetDates.greaterOneYear)
                color = 'red';
        }

        return this.colorService.getColor(color, '200');
    }

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Aktuelle Übersicht</title>
          <style>
                @page {
                    size: A4 landscape;
                }
                body, table{
                    font-size: 10px;
                    font-family: Arial;
                    -webkit-print-color-adjust: exact;
                    padding: 0px;
                    margin: 0px;
                }
                .card {
                    position: relative;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    background-color: #fff;
                    border: 1px solid #cfd8dc;
                    margin-bottom: 10px;
                }
                .card-header {
                    padding: 5px 5px;
                    margin-bottom: 0;
                    background-color: #eceff1;
                    border-bottom: 1px solid #cfd8dc;
                    font-weight: bold;
                }
                .card-block {
                    -webkit-box-flex: 1;
                    flex: 1 1 auto;
                    padding: 0px;
                }
                [class*="col-sm-"] {
                    float: left;
                } 
                .row {
                    margin-right: 15px;
                    margin-left: 15px;
                    display: flex;
                    flex-wrap: wrap;
                }
                .col-sm-6 {
                    width: 48%;
                    padding-right:10px;
                    padding-left:10px;
                }
                .table {
                    font-size: 8px;
                    width: 100%;
                    max-width: 100%;
                    margin-bottom: 0px;
                    background-color: transparent;
                }
                table {
                    border-collapse: collapse;
                }
                .table-bordered {
                    border: 1px solid #cfd8dc;
                }
                .table-bordered th, .table-bordered td {
                    border: 1px solid #cfd8dc;
                }
                .table thead th {
                    vertical-align: bottom;
                    border-bottom: 2px solid #cfd8dc;
                }
                .table-sm th, .table-sm td {
                    padding: 1px;
                    height: 10px;
                }

                .table th, .table td {
                    border-top: 1px solid #cfd8dc;
                }

                .table th{
                    display: none;
                }
                .table-bordered th{
                    display:table-cell;
                }
                th {
                    text-align: left;
                    font-weight: bold;
                }
                .badge-pill {
                    border-radius: 10rem;
                }
                .float-right {
                    float: right !important;
                }
                .badge-danger {
                    background-color: #f86c6b;
                }
                .badge-pill {
                    padding-right: 8px;
                    padding-left: 8px;
                }
                .badge {
                    display: inline-block;
                    padding: 4px 5px;
                    font-size: 75%;
                    font-weight: bold;
                    line-height: 1;
                    color: #fff;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                }
                .text-center {
                    text-align: center !important;
                }
          </style>
        </head>
        <body onload="window.print();window.close()" >${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }

}



