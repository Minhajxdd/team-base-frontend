import { Component, DestroyRef, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProgressSpinner } from 'primeng/progressspinner';
import { ProjectRequestAcceptService } from './project-request-accept.service';

@Component({
  selector: 'app-project-request-accept',
  imports: [ProgressSpinner],
  templateUrl: './project-request-accept.component.html',
  styleUrl: './project-request-accept.component.css',
})
export class ProjectRequestAcceptComponent {
  displayText = signal<string>('Request Is Being Proccessing...');

  constructor(
    private route: ActivatedRoute,
    private projectRequestAcceptService: ProjectRequestAcceptService,
    private router: Router,
    private destroy: DestroyRef
  ) {
    const { token } = this.route.snapshot.queryParams;
    const { projectId } = this.route.snapshot.params;

    if (!token || !projectId) {
      this.displayText.set('Invalid Request');

      const timer = setTimeout(() => {
        this.router.navigate(['login']);
      }, 5000);

      this.destroy.onDestroy(() => {
        clearTimeout(timer);
      })
    }

    const subscription = this.projectRequestAcceptService
      .sendAcceptRequest(projectId, token)
      .subscribe({
        complete: () => {
          this.displayText.set('Successfully added to project');

          const timer = setTimeout(() => {
            this.router.navigate(['']);
          }, 5000);

          this.destroy.onDestroy(() => {
            clearTimeout(timer);
          })
        },
        error: () => {
          this.displayText.set('Invalid Request');

          const timer = setTimeout(() => {
            this.router.navigate(['']);
          }, 5000);

          this.destroy.onDestroy(() => {
            clearTimeout(timer);
          })
        },
      });

    this.destroy.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
