import { Component, DestroyRef, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectProjectId,
  selectProjectUserId,
} from '../../store/project.selector';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-zego-cloud',
  imports: [],
  templateUrl: './zego-cloud.component.html',
  styleUrl: './zego-cloud.component.css',
})
export class ZegoCloudComponent {
  projectId!: string;
  userId!: string;
  constructor(private _store: Store, private destroyRef: DestroyRef) {
    const subscription = this._store
      .select(selectProjectId)
      .subscribe((projectId) => {
        this.projectId = projectId;
      });

    const subscription1 = this._store
      .select(selectProjectUserId)
      .subscribe((userId) => {
        if (userId) this.userId = userId;
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  @ViewChild('root')
  root!: ElementRef;

  ngAfterViewInit() {
    const roomID = this.projectId;

    const appID = environment.CLAUDINARY_APPID;
    const serverSecret = environment.CLAUDINARY_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      this.userId,
      this.userId
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start a call.
    zp.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  }
}
