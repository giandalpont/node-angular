import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private pageTitleSubject = new BehaviorSubject<string>('Dashboard');

  getPageTitle(): Observable<string> {
    return this.pageTitleSubject.asObservable();
  }

  setPageTitle(title: string): void {
    this.pageTitleSubject.next(title);
  }
}
