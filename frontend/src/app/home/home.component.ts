import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = false;
  isLoggedIn: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe({
      next: () => {
        this.isLoggedIn = true;
      },
      error: (err) => {
        this.message = err.error.message;
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
    });

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
    } else {
      this.sidenav.open();
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error.message;
      },
    });
  }
}
