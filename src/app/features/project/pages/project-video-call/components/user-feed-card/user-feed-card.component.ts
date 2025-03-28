import { AfterViewInit, Component, DestroyRef } from '@angular/core';
import { ProjectVideoCallMainService } from '../../service/project-video-call.main.service';
import { Store } from '@ngrx/store';
import {
  selectProjectId,
  selectProjectUserId,
} from '../../../../store/project.selector';

@Component({
  selector: 'app-user-feed-card',
  imports: [],
  templateUrl: './user-feed-card.component.html',
  styleUrl: './user-feed-card.component.css',
})
export class UserFeedCardComponent implements AfterViewInit {
  localStream!: MediaStream;

  projectId!: string;
  userId!: string;

  constructor(
    private _ProjectVideoCallMainService: ProjectVideoCallMainService,
    private store: Store,
    private destoryRef: DestroyRef
  ) {
    const subscription1 = this.store
      .select(selectProjectId)
      .subscribe((data) => {
        this.projectId = data;
      });

    const subscription2 = this.store.select(selectProjectUserId).subscribe({
      next: (data) => {
        if (data) this.userId = data;
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  }

  joinRoom() {
    if (this.userId && this.projectId) {
      console.log('joining chat ...');
      this._ProjectVideoCallMainService.joinRoom(this.userId, this.projectId);
      this._ProjectVideoCallMainService.enableFeed();

      this._ProjectVideoCallMainService.localStream$.subscribe((stream) => {
        if (stream) {
          this.localStream = stream;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    console.log('^^^^User Feed Card View Initilized^^^^');
    this.joinRoom();
  }
}
