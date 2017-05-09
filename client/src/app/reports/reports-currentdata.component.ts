import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2TableModule } from 'ng2-table';

import { ReportService } from '../_services/report.service';
@Component({
    selector: 'reports-currentdata',
    templateUrl: './reports-currentdata.component.html'
})
export class ReportsCurrentdataComponent implements OnInit {

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
        this.dataContainer.nativeElement.innerHTML = data;
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
          ${this.territoryCards.style}</style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }

}



