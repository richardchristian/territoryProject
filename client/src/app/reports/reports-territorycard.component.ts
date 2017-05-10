import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2TableModule } from 'ng2-table';

import { ReportService } from '../_services/report.service';
@Component({
    selector: 'reports-territorycard',
    templateUrl: './reports-territorycard.component.html'
})
export class ReportsTerritoryCardComponent implements OnInit {

    @ViewChild('dataContainer') dataContainer: ElementRef;

    constructor(
        public toastr: ToastsManager,
        private reportService: ReportService
    ) { }

    public territoryCards: any;

    public ngOnInit(): void {
        this.reportService.getAllTerritoryCards()
            .subscribe(data => {
                this.territoryCards = data;
                this.loadData(this.territoryCards.table);

            });
    }

    loadData(data) {
        var responsiveData = data.replace(/width:56pt/g, 'width:5%');
        responsiveData = responsiveData.replace(/width:112pt/g, 'width:10%');
        responsiveData = responsiveData.replace(/width:280pt/g, 'width:25%');
        responsiveData = responsiveData.replace(/width:1120pt/g, 'width:100%');
        this.dataContainer.nativeElement.innerHTML = responsiveData;
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
          ${this.territoryCards.style}
        </head>
        <body onload="window.print();window.close()">${this.territoryCards.table}</body>
      </html>`
        );
        popupWin.document.close();
    }
}



