import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { TerritoryService } from '../_services/territory.service';
import { Territory } from '../_models/territory';

import { SettingsTerritoryDialogComponent } from './dialogs/settings-territory-dialog.component';

@Component({
  selector: 'settings-territory',
  templateUrl: './settings-territory.component.html',
  providers: [TerritoryService]
})
export class SettingsTerritoryComponent implements OnInit {

  territories: Observable<Territory[]>;
  private searchTerms = new BehaviorSubject<string>('');
  @ViewChild('infoModal') infoModal: SettingsTerritoryDialogComponent;

  constructor(
    private territoryService: TerritoryService,
    private toastr: ToastsManager
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.territories = this.searchTerms
      .debounceTime(300)
      .switchMap(term => this.territoryService.search(term))
      .catch(error => {
        console.log(error);
        return Observable.of<Territory[]>([]);
      });
  }

  save(_territory: Territory) {
    if (_territory._id === "") {
      this.territoryService.create(_territory)
        .subscribe(
        data => {
          this.searchTerms.next("");
          this.toastr.success("Gebiet erfolgreich hinzugefügt", "(" + data.territoryNumber + ") " + data.name)
        },
        err => {
          console.log(err);
          this.toastr.error(err, "Fehler");
        });
    } else {
      this.territoryService.update(_territory)
        .subscribe(
        data => {
          this.searchTerms.next("");
          this.toastr.success("Gebiet erfolgreich bearbeitet", "(" + data.territoryNumber + ") " + data.name)
        },
        err => {
          console.log(err);
          this.toastr.error(err, "Fehler");
        });
    }
  }

}
