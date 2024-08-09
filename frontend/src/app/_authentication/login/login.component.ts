import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { AuthService } from '../../_services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  }
  isLoggedIn: boolean = false
  isLoginFailed: boolean = false
  isLoading: boolean = false
  message: string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.authService.verifyToken().subscribe({
      next: () => {
        this.isLoggedIn = true
        this.isLoading = false
        this.cd.detectChanges()
      },
      error: (err) => {
        this.message = err.error.message
        this.isLoggedIn = false
        this.isLoading = false
        this.cd.detectChanges()
      },
    })
  }

  onSubmit(): void {
    this.isLoading = true
    this.authService.login(this.form).subscribe({
      next: () => {
        this.isLoginFailed = false
        this.isLoggedIn = true
        this.isLoading = false
        this.cd.detectChanges()
      },
      error: (err) => {
        this.message = err.error.message
        this.isLoginFailed = true
        this.isLoading = false
        this.cd.detectChanges()
      },
    })
  }

  logout(): void {
    this.isLoading = true
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false
        this.isLoading = false
        this.resetForm()
        this.router.navigate(['/login'])
        this.cd.detectChanges()
      },
      error: (err) => {
        this.message = err.error.message
        this.isLoading = false
        this.cd.detectChanges()
      },
    })
  }

  resetForm(): void {
    this.form.email = null
    this.form.password = null
  }
}
