import { getLocaleMonthNames, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ThemeModeService } from '../../../../core/services/theme.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProjectId } from '../../../../features/project/store/project.selector';

@Component({
  selector: 'app-project-nav-bar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './project-nav-bar.component.html',
  styleUrl: './project-nav-bar.component.css',
})
export class ProjectNavBarComponent implements OnInit {
  private readonly themeService = inject(ThemeModeService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  projectId = signal<null | string>(null);

  isToggled = signal(true);
  isProfileToggled = signal(false);

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
