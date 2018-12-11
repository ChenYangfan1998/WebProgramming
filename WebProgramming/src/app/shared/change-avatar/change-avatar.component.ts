import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {myConfig} from '../../../config/my-config';
import {LoginService} from '../../services/user/login.service';
import {UploadAvatarService} from '../../services/user/upload-avatar.service';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {

  avatarSrc;
  user;

  constructor(
    public dialogRef: MatDialogRef<ChangeAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public loginService: LoginService,
    public uploadAvatarService: UploadAvatarService
  ) { }

  ngOnInit () {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.avatarSrc = myConfig.baseUrl + 'upload/' + this.user.username;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFile(fileDom) {
    const reader = new FileReader();
    const file = fileDom.files[0];
    reader.onload = (e: any) => {
      this.uploadAvatarService.uploadAvatar(file, this.user.username).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          window.location.reload();
        }
      );
    };
    reader.readAsDataURL(file);
  }
}
