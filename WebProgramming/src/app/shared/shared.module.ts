import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatModule} from '../mat.module';
import {PublishDiaryDialogComponent} from './publish-diary-dialog/publish-diary-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DiaryComponent} from './diary/diary.component';
import {ChangeAvatarComponent} from './change-avatar/change-avatar.component';
import {ChangeResumeComponent} from './change-resume/change-resume.component';
import {TagCardComponent} from './tag-card/tag-card.component';

@NgModule({
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PublishDiaryDialogComponent,
    DiaryComponent,
    ChangeAvatarComponent,
    ChangeResumeComponent,
    TagCardComponent,
  ],
  exports: [
    PublishDiaryDialogComponent,
    DiaryComponent,
    ChangeAvatarComponent,
    ChangeResumeComponent,
    TagCardComponent,
  ]
})
export class SharedModule {
}
