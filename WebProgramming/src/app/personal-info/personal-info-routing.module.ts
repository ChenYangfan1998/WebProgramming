import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalInfoHomeComponent} from './personal-info-home/personal-info-home.component';
import {PersonalInfoComponent} from './personal-info.component';

const personalInfoRoutes: Routes = [
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
    children: [
      {path: '', component: PersonalInfoHomeComponent},
      {path: '**', component: PersonalInfoHomeComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(personalInfoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PersonalInfoRoutingModule {
}
