import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../services/models/user-model';
import {LoginService} from '../../services/user/login.service';
import {PublishDiaryDialogComponent} from '../../shared/publish-diary-dialog/publish-diary-dialog.component';
import {MatDialog} from '@angular/material';
import {ChangeAvatarComponent} from '../../shared/change-avatar/change-avatar.component';
import {myConfig} from '../../../config/my-config';
import {ChangeResumeComponent} from '../../shared/change-resume/change-resume.component';
import {DiaryService} from '../../services/diary/diary.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info-home.component.html',
  styleUrls: ['./personal-info-home.component.scss']
})
export class PersonalInfoHomeComponent implements OnInit {

  user: UserModel;
  avatarSrc;
  diaries;

  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private diaryService: DiaryService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.diaryService.getDiaryByUsername(this.user.username).subscribe(
      (data: any) => {
        this.diaries = data.diaries.reverse();
      }
    );
    this.loginService.state.subscribe(
      (user) => {
        if (user.username) {
          this.user = user;
        }
      }
    );

    this.avatarSrc = myConfig.baseUrl + 'upload/' + this.user.username;
  }

  newDiary () {
    const newDiaryDialogRef = this.dialog.open(PublishDiaryDialogComponent, {
      width: '500px',
      data: {},
      autoFocus: false
    });
    newDiaryDialogRef.afterClosed().subscribe(
      () => {
        this.diaryService.getDiaryByUsername(this.user.username).subscribe(
          (data: any) => {
            this.diaries = data.diaries.reverse();
          }
        );
      }
    );
  }

  changeAvatar () {
    const chanegAvatarDialogRef = this.dialog.open(ChangeAvatarComponent, {
      width: '400px',
      data: {},
      autoFocus: false
    });
    // chanegAvatarDialogRef.afterClosed().subscribe(
    //   () => {
    //     this.avatarSrc = myConfig.baseUrl + 'upload/' + this.user.username;
    //   }
    // );
  }

  changeResume () {
    const changeResumeDialogRef = this.dialog.open(ChangeResumeComponent, {
      width: '500px',
      data: {}
    });
  }
}

