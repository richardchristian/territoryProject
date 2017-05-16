import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public loggedIn: boolean = false;
  public currentUser: User;
  public status: { isopen: boolean } = { isopen: false };

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.auth.isLoggedIn.subscribe((data) => {
      this.currentUser = data;
      this.loggedIn = data !== undefined;
    });
  }

  ngOnInit() {
    var localUser = localStorage.getItem('currentUser');
    if (localUser) {
      this.currentUser = <User>(JSON.parse(localUser).user);
      this.loggedIn = true;
    }
  }

  logout() {
    this.auth.logout().subscribe(
      (data) => {
        this.router.navigate(['/pages/login']);
      });
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
