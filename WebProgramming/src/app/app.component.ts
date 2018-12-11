import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {LoginService} from './services/user/login.service';
import {UserModel} from './services/models/user-model';
import {MatSnackBar} from '@angular/material';
import {SnackBarService} from './services/snack-bar/snack-bar.service';
import {RestfulService} from './services/restful/restful.service';
import {SearchService} from './services/search/search.service';
import {DiaryService} from './services/diary/diary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogin = false;
  username;
  copyright;

  allTags;
  mostSearched = [];
  mostContent = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private snackBarService: SnackBarService,
    public snackBar: MatSnackBar,
    private restfulService: RestfulService,
    private searchService: SearchService,
    private diaryService: DiaryService
  ) {}


  mode = 'push';
  ngOnInit () {
    this.onResize();
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.authService.auth().subscribe(
        () => {
          this.isLogin = true;
          this.username = JSON.parse(localStorage.getItem('user')).username;
        },
        () => {
          this.loginService.logout();
        }
      );
    }
    this.loginService.state.subscribe(
      (user: UserModel) => {
        if (user.username) {
          this.isLogin = true;
          this.username = user.username;
        } else {
          this.isLogin = false;
          this.username = '';
        }
      }
    );
    this.snackBarService.state.subscribe(
      (data) => {
        if (data) {
          let duration = 5000;
          if (data === '完成！') {
            duration = 2000;
          }
          this.snackBar.open(data.toString(), '好的', {
            duration: duration,
            panelClass: 'snack-bar'
          });
        }
      }
    );

    this.restfulService.getWallPaper().subscribe(
      (data: any) => {
        console.log('API返回格式：');
        console.log(data);
        document.getElementById('ghost').style.backgroundImage
          = 'url("http://s.cn.bing.net' + data.images[0].url + '")';
        this.copyright = data.images[0].copyright;
      }
    );
    this.initTags();
  }

  initTags() {
    this.update();
    setInterval(() => {
      this.update();
    }, 10000);
  }

  update () {
    this.diaryService.getAllTags().subscribe(
      (res: any) => {
        this.mostContent = [];
        this.mostSearched = [];
        this.allTags = res;
        const resCopy = res.concat();
        // this.mostSearched
        for (let i = 0; i < resCopy.length; i++) {
          for (let j = i; j < resCopy.length; j++) {
            if (resCopy[i].hot < resCopy[j].hot) {
              const temp = resCopy[i];
              resCopy[i] = resCopy[j];
              resCopy[j] = temp;
            }
          }
        }
        for (let i = 0; i < 5; i++) {
          if (resCopy[i]) {
            this.mostSearched.push(resCopy[i]);
          }
        }
        for (let i = 0; i < resCopy.length; i++) {
          for (let j = i; j < resCopy.length; j++) {
            if (resCopy[i].count < resCopy[j].count) {
              const temp = resCopy[i];
              resCopy[i] = resCopy[j];
              resCopy[j] = temp;
            }
          }
        }
        for (let i = 0; i < 5; i++) {
          if (resCopy[i]) {
            this.mostContent.push(resCopy[i]);
          }
        }
      }
    );
  }

  onResize () {
    const width = window.innerWidth;
    if (width < 960) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
    }
  }

  logout () {
    this.loginService.logout();
    this.router.navigateByUrl('/trunk');
  }

  search (tag) {
    this.router.navigateByUrl('/trunk');
    this.searchService.search(tag);
  }
}
