import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserModel} from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private subject: Subject<String> = new BehaviorSubject<String>('');

  public get state(): Observable<String> {
    return this.subject.asObservable();
  }

  constructor() { }

  showSnackBar (message) {
    this.subject.next(message);
  }
}
