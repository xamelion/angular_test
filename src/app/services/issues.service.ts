import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableIssue } from '../model/table';
import { issues } from '../consts/issues';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private readonly issues$$ = new BehaviorSubject<TableIssue[]>(issues);

  getIssues$() {
    return this.issues$$.asObservable();
  }
}
