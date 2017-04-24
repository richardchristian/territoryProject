import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

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

  constructor(private territoryService: TerritoryService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.territories = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.territoryService.search(term))
      .catch(error => {
        console.log(error);
        return Observable.of<Territory[]>([]);
      });
  }

}
