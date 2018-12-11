import {AfterViewInit, Component, ViewChild, OnDestroy} from '@angular/core';
import {SignUpService} from '../../services/user/sign-up.service';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginService} from '../../services/user/login.service';
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements AfterViewInit, OnDestroy {
  @ViewChild('usernameInput') usernameInput;
  @ViewChild('passwordInput') passwordInput;
  @ViewChild('passwordEnsureInput') passwordEnsureInput;

  username = '';
  resume = '';

  password = '';
  passwordEnsure = '';

  errorMessage;
  successMessage;
  isPasswordEnsured$;
  isPasswordEnsured;
  isPasswordWork$;
  passwordMessage;

  usernameMessage;

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private loginService: LoginService,
    private snackBarService: SnackBarService
  ) { }

  ngAfterViewInit() {
    this.initPasswordObservable();
  }
  ngOnDestroy () {
    this.isPasswordEnsured$.unsubscribe();
    this.isPasswordWork$.unsubscribe();
  }

  signUp () {
    this.signUpService.signUp(this.username, this.password, this.resume).subscribe(
      () => {
        this.snackBarService.showSnackBar('注册成功！');
        this.router.navigateByUrl('/trunk/login');
      },
      (error) => {
        this.snackBarService.showSnackBar(error.error.error);
      }
    );
  }

  canSubmit () {
    const allFill = this.username && this.password && this.passwordEnsure;
    const passwordCheck = this.isPasswordEnsured;
    return allFill && passwordCheck;
  }


  private initPasswordObservable () {
    this.isPasswordEnsured$ = fromEvent(this.passwordEnsureInput.nativeElement, 'input').subscribe(
      () => {
        this.isPasswordEnsured = this.passwordEnsure === this.password;
      }
    );
    this.isPasswordWork$ = fromEvent(this.passwordInput.nativeElement, 'input').pipe(
      distinctUntilChanged(),
    ).subscribe(
      () => {
        if (this.password && this.password.length >= 8 && this.password.length <= 32) {
          this.passwordMessage = '👍';
        } else {
          this.passwordMessage = '密码应该在8到32位之间';
        }
      }
    );
  }
}
