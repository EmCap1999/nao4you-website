import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
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
  }

  // sign out
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
