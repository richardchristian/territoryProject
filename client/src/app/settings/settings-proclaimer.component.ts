import { Component, OnInit } from '@angular/core';

import { ProclaimerService } from '../_services/proclaimer.service';
import { Proclaimer } from '../_models/proclaimer';

@Component({
  selector: 'app-settings-proclaimer',
  templateUrl: './settings-proclaimer.component.html'
})
export class SettingsProclaimerComponent implements OnInit {

  private proclaimers: Proclaimer[];

  constructor(private proclaimerService: ProclaimerService) { }

  ngOnInit() {
    this.proclaimerService.getAll()
      .subscribe(data => this.proclaimers = data)
  }
}



