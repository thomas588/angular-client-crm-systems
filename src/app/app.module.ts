import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Event, RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {ToastrModule} from 'ngx-toastr';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {AuthGuard} from "./shared/classes/auth.guard";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SiteLayoutComponent,
    AuthLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    Event],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    Event,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
