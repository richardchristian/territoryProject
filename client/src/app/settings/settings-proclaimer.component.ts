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

  constructor(
    private proclaimerService: ProclaimerService,
    private toastr: ToastsManager
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.proclaimers = this.searchTerms
      .debounceTime(300)
      .switchMap(term => this.proclaimerService.search(term))
      .catch(error => {
        console.log(error);
        return Observable.of<Proclaimer[]>([]);
      });
  }

  save(_proclaimer: Proclaimer) {
    if (_proclaimer._id === "") {
      this.proclaimerService.create(_proclaimer)
        .subscribe(
        data => {
          this.searchTerms.next("");
          this.toastr.success("Verkündiger erfolgreich hinzugefügt", data.firstName + " " + data.lastName)
        },
        err => {
          console.log(err);
          this.toastr.error(err, "Fehler");
        });
    } else {
      this.proclaimerService.update(_proclaimer)
        .subscribe(
        data => {
          this.searchTerms.next("");
          this.toastr.success("Verkündiger erfolgreich bearbeitet", data.firstName + " " + data.lastName)
        },
        err => {
          console.log(err);
          this.toastr.error(err, "Fehler");
        });

    }
  }
}



