import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginResponse } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/jwt';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private breakpointObserver = inject(BreakpointObserver);

  initials$: Observable<string>;
  loginResponse$ = new ReplaySubject<LoginResponse | null>();

  showCreateButton$: Observable<boolean>;

  @Output('login') login$ = new EventEmitter();
  @Output('logoff') logoff$ = new EventEmitter();

  @Input() set loginResponse(value: LoginResponse | null) {
    this.loginResponse$.next(value);
  }

  constructor() {
    this.initials$ = this.loginResponse$.pipe(
      map((response) =>
        response?.userData?.preferred_username
          .split(/[._-]/)
          .map((token: string) => token.charAt(0))
          .join('')
      )
    );

    this.showCreateButton$ = this.loginResponse$.pipe(
      map((response) => hasRole('user', response?.accessToken))
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
