import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LoginService} from '../../services/user/login.service';
import {myConfig} from '../../../config/my-config';

@Component({
  selector: 'app-change-resume',
  templateUrl: './change-resume.component.html',
  styleUrls: ['./change-resume.component.scss']
})
export class ChangeResumeComponent implements OnInit {

  user;
  resume;
  resumeChanged;

  constructor(
    public dialogRef: MatDialogRef<ChangeResumeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public loginService: LoginService,
  ) { }

  ngOnInit () {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.resume = this.user.resume;
      this.resumeChanged = this.user.resume;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
