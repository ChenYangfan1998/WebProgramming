import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  toArticle () {
    this.authService.auth().subscribe(
      () => {
        this.router.navigateByUrl('/article/example');
      },
      () => {
        alert('权限不足，请先登录账户');
      }
    );
  }

  toPhotoShop () {
    this.authService.auth().subscribe(
      () => {
        this.router.navigateByUrl('/photo-shop');
      },
      () => {
        alert('权限不足，请先登录账户');
      }
    );
  }

  toEditor () {
    this.authService.auth().subscribe(
      () => {
        this.router.navigateByUrl('/editor/example');
      },
      () => {
        alert('权限不足，请先登录账户');
      }
    );
  }
}
