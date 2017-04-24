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

import { ProclaimerService } from '../_services/proclaimer.service';
import { Proclaimer } from '../_models/proclaimer';

import { SettingsProclaimerDialogComponent } from './dialogs/settings-proclaimer-dialog.component';

@Component({
  selector: 'settings-proclaimer',
  templateUrl: './settings-proclaimer.component.html',
  providers: [ProclaimerService]
})
export class SettingsProclaimerComponent implements OnInit {

  proclaimers: Observable<Proclaimer[]>;
  private searchTerms = new BehaviorSubject<string>('');
  @ViewChild('infoModal') infoModal: SettingsProclaimerDialogComponent;

  constructor(private proclaimerService: ProclaimerService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.proclaimers = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.proclaimerService.search(term))
      .catch(error => {
        console.log(error);
        return Observable.of<Proclaimer[]>([]);
      });
  }
}



