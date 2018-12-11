import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = 'Bearer ' + localStorage.getItem('token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    return next.handle(authReq);
  }
}
