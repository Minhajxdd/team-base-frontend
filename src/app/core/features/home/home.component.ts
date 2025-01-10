import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../auth/auth.service';
import { UserNavbarComponent } from "../../../shared/components/navbar/user-navbar/user-navbar.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, UserNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  data: any;

  ngOnInit() {
    this.http
      .get('http://localhost:3000/user', { withCredentials: true })
      .subscribe((data) => {
        console.log('This is from home');
        console.log(data);
        data = data;
      });
  }

  signOut() {
    this.http.post(`${environment.back_end}/auth/logout`, {}, {withCredentials: true})
    .subscribe({
      complete: () => {
        this.authService.setAccessToken = '';
        this.router.navigate(['login']);
      }
    })
  }
}
