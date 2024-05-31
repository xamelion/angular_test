import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableIssue } from '../../model/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TableComponent {
  @Input() set issues(value: TableIssue[]) {
    this._issues = value;

    this.checkedState = Array(value.length).fill(false);
  }
  get issues() {
    return this._issues;
  }
  private _issues: TableIssue[] = [];

  selectDeselectAllIsChecked = false;
  numCheckboxesSelected = 0;
  checkedState: boolean[] = [];

  handleOnChange(position: number) {
    this.checkedState = this.checkedState.map((isChecked, index) =>
      position === index ? !isChecked : isChecked
    );

    const totalSelected = this.checkedState.filter(Boolean).length;

    this.numCheckboxesSelected = totalSelected;
    this.selectDeselectAllIsChecked = totalSelected === this.issues.length;
  }

  handleSelectDeselectAll(event: Event) {
    const { checked } = <HTMLInputElement>event.target;

    this.checkedState = this.issues.map(
      (issue) => issue.status === 'open' && checked
    );

    this.selectDeselectAllIsChecked = !this.selectDeselectAllIsChecked;
    this.numCheckboxesSelected = this.selectDeselectAllIsChecked
      ? this.checkedState.filter(Boolean).length
      : 0;
  }
}
