import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrunkComponent} from './trunk.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AboutComponent} from './about/about.component';
import {InfoComponent} from './info/info.component';

const trunkRoutes: Routes = [
  {
    path: 'trunk',
    component: TrunkComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'about', component: AboutComponent},
      {path: 'home', component: HomeComponent},
      {path: '**', component: InfoComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(trunkRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrunkRoutingModule {
}
