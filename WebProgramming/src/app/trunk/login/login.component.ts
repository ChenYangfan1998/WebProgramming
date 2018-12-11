import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/user/login.service';
import {Router} from '@angular/router';
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginName;
  password;
  errorMessage;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginName, this.password);
    this.loginService.state.subscribe(
      (data) => {
        if (data.username) {
          this.snackBarService.showSnackBar('欢迎，' + data.username);
          this.router.navigateByUrl('/personal-info');
          this.errorMessage = '';
        } else {
          this.errorMessage = '登录信息有误';
        }
      }
    );
  }
}
