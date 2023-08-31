import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { MockComponent, MockProvider } from 'ng-mocks';
import { LoadingStateService } from './core/loading-state.service';
import { of } from 'rxjs';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { NgxScrollTopComponent } from 'ngx-scrolltop';

describe('AppComponent', () => {
  let oidcSecurityServiceMock: OidcSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        MockProvider(OidcSecurityService),
        MockProvider(LoadingStateService),
      ],
      declarations: [
        AppComponent,
        MockComponent(SidebarComponent),
        MockComponent(NgxScrollTopComponent),
      ],
    });

    oidcSecurityServiceMock = TestBed.inject(OidcSecurityService);
    spyOn(oidcSecurityServiceMock, 'checkAuth').and.returnValue(
      of({} as LoginResponse)
    );
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'blog-frog-16'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('blog-frog-16');
  });
});
