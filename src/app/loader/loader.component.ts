import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewRef
} from '@angular/core';
import {LoaderService} from 'services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  isLoading = false;

  constructor(public loader: LoaderService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loader.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.detectChanges();
    });
  }

  private detectChanges() {
    if (!(this.cdRef as ViewRef).destroyed) {
      this.cdRef.detectChanges();
    }
  }
}
