import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  pageTitle$: Observable<string>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 768px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private headerService: HeaderService, private breakpointObserver: BreakpointObserver) {
    this.pageTitle$ = this.headerService.getPageTitle();
  }

  ngOnInit(): void {
  }

  toggleSidenav(): void {
    // This method will be implemented in the template to toggle the sidenav
  }
}