import { getLocaleMonthNames, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ThemeModeService } from '../../../../core/services/theme.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../../features/project/store/project.selector';
import { Observable, Subscription } from 'rxjs';
import { selectUser } from '../../../store/user/user.selector';
import { User } from '../navbar.model';
import { loadUser } from '../../../store/user/user.actions';

@Component({
  selector: 'app-project-nav-bar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './project-nav-bar.component.html',
  styleUrl: './project-nav-bar.component.css',
})
export class ProjectNavBarComponent implements OnInit {
  private readonly themeService = inject(ThemeModeService);
  private readonly destroyRef = inject(DestroyRef);

  user$: Observable<any>;

  constructor(private store: Store) {
    this.store.dispatch(loadUser());

    this.user$ = this.store.select(selectUser);
  }

  projectId = signal<null | string>(null);

  isDarkMode = this.themeService.$isDarkMode;

  isToggled = signal(true);
  isProfileToggled = signal(false);

  subscription1$!: Subscription;

  user = signal<User | null>(null);

  ngOnInit() {
    const subscription = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId.set(data);
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    if (localStorage.getItem('side_bar_opened') === 'true') {
      this.isToggled.set(true);
    } else {
      this.isToggled.set(false);
    }

    this.subscription1$ = this.user$.subscribe((userData) => {
      this.user.set(userData);
    });

    this.destroyRef.onDestroy(() => {
      this.subscription1$.unsubscribe();
    });
  }

  toggle() {
    this.isToggled = signal(!this.isToggled());
    localStorage.setItem('side_bar_opened', String(this.isToggled()));
  }

  toggleProfile() {
    this.isProfileToggled.set(!this.isProfileToggled());
  }

  onThemeToggle() {
    this.themeService.toggle();
  }
}
