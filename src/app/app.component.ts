import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './child.component';
import { Table } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChildComponent, Table],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isVisible = false;
  prefetchCondition = false;
  issues: any = [
    {
      id: 'e47f8d1a-7c3d-4b0f-8a7f-f8a7b8f72d3d',
      name: 'TypeError',
      message: "Cannot read properties of null (reading 'value')",
      status: 'open',
      numEvents: 88,
      numUsers: 48,
      value: 1,
    },
    {
      id: 'b81d3ec8-7f4c-412b-9b9a-1e26f5e8a9f4',
      name: 'RangeError',
      message: 'Maximum call stack size exceeded',
      status: 'resolved',
      numEvents: 33,
      numUsers: 19,
      value: 1,
    },
    {
      id: 'f57e6a9c-27a3-4f8e-aaf3-8f4e5e8b9a5d',
      name: 'SyntaxError',
      message: 'Unexpected token < in JSON at position 0',
      status: 'open',
      numEvents: 42,
      numUsers: 29,
      value: 1,
    },
    {
      id: '2d4e8a73-6c0d-42b8-93a7-4d6f8f2e9b1f',
      name: 'ReferenceError',
      message: 'x is not defined',
      status: 'open',
      numEvents: 21,
      numUsers: 16,
      value: 1,
    },
    {
      id: 'c4e2b3a4-8b7c-45d8-9b6b-1e4f5e9b8a5e',
      name: 'EvalError',
      message: 'Invalid use of eval function',
      status: 'resolved',
      numEvents: 9,
      numUsers: 8,
      value: 1,
    },
    {
      id: 'd8e2b3a5-9b7d-45e8-9a7c-1e6f4e9a8b6d',
      name: 'TypeError',
      message: 'Undefined is not a function',
      status: 'open',
      numEvents: 57,
      numUsers: 32,
      value: 1,
    },
  ];
}
