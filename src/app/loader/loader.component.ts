import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoaderService} from 'services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  isLoading = false;

  constructor(public loader: LoaderService) {
  }

  ngOnInit() {
    this.loader.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }
}
