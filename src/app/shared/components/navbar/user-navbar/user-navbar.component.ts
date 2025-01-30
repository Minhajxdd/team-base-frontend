import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ThemeModeService } from '../../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectUserLoading,
} from '../../../store/user/user.selector';
import { loadUser } from '../../../store/user/user.actions';
import { User } from '../navbar.model';

@Component({
  selector: 'app-user-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent implements OnDestroy {
  private readonly themeService = inject(ThemeModeService);
  private readonly authService = inject(AuthService);

  user$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.user$ = this.store.select(selectUser);
    this.loading$ = this.store.select(selectUserLoading);
  }

  subscription1$!: Subscription;
  subscription2$!: Subscription;

  isLoading = signal<boolean | null>(false);
  user = signal<User | null>(null);

  ngOnInit() {
    this.store.dispatch(loadUser());

    this.subscription1$ = this.user$.subscribe((userData) => {
      this.user.set(userData);
    });

    this.subscription2$ = this.loading$.subscribe((loadingData) => {
      this.isLoading.set(loadingData);
    });
  }

  isDarkMode = this.themeService.$isDarkMode;
  isDropActive = signal(false);

  onToggle() {
    this.themeService.toggle();
  }

  onProfileBtn() {
    this.isDropActive.set(!this.isDropActive());
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription1$!.unsubscribe();
    this.subscription2$!.unsubscribe();
  }
}
