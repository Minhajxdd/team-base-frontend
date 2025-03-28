import { TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent {
  title = signal<string>('');

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    let routePath = route.snapshot.url[1].path;
    this.title.set(routePath);
  }

  isSidebarVisible = signal(true);

  toggleSidebar(): void {
    this.isSidebarVisible.set(!this.isSidebarVisible());
  }

  onLogout() {
    this.authService.logout();
  }
}
