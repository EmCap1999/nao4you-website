import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  isLoggedIn: boolean = false;
  message: string = '';

  //user infos list
  userKeys(): string[] {
    return Object.keys(this.user).filter(key => key !== 'phone');
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        this.user = res.userInfo;
        this.isLoggedIn = true;
      },
      error: (err) => {
        this.message = err.error.message;
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
    });
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
