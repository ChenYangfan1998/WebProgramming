import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private subject: Subject<String> = new BehaviorSubject<String>('');

  public get state(): Observable<String> {
    return this.subject.asObservable();
  }

  constructor() { }

  search (message) {
    this.subject.next(message);
  }

  searched () {
    this.subject.next('');
  }
}
