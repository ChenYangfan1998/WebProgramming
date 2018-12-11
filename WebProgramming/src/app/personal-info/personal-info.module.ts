import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoHomeComponent } from './personal-info-home/personal-info-home.component';
import {MatModule} from '../mat.module';
import {SharedModule} from '../shared/shared.module';
import {PersonalInfoRoutingModule} from './personal-info-routing.module';
import {PersonalInfoComponent} from './personal-info.component';
import {FormsModule} from '@angular/forms';
import {PublishDiaryDialogComponent} from '../shared/publish-diary-dialog/publish-diary-dialog.component';
import {ChangeAvatarComponent} from '../shared/change-avatar/change-avatar.component';
import {ChangeResumeComponent} from '../shared/change-resume/change-resume.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PersonalInfoRoutingModule,
    MatModule
  ],
  declarations: [
    PersonalInfoHomeComponent,
    PersonalInfoComponent
  ],
  entryComponents: [
    PublishDiaryDialogComponent,
    ChangeAvatarComponent,
    ChangeResumeComponent
  ]
})
export class PersonalInfoModule { }
