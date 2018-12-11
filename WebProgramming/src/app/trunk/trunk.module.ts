import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrunkComponent } from './trunk.component';
import {TrunkRoutingModule} from './trunk-routing.module';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatModule} from '../mat.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    TrunkRoutingModule,
    FormsModule,
    SharedModule,
    MatModule,
  ],
  declarations: [
    TrunkComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    InfoComponent
  ]
})
export class TrunkModule { }
