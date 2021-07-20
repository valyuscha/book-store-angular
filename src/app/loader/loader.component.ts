import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewRef} from '@angular/core';
import {Select} from '@ngxs/store';
import {LoaderState} from 'state/loader.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Select(LoaderState.getIsLoadingStatus) isLoading!: Observable<boolean>;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  private detectChanges() {
    if (!(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
