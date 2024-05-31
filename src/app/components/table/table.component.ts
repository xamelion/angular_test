import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckedState, TableIssue } from '../../model/table';

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

    this.checkedState = Array(value.length).fill({
      checked: false,
      backgroundColor: '#ffffff',
    });
  }
  get issues() {
    return this._issues;
  }
  private _issues: TableIssue[] = [];

  selectDeselectAllIsChecked = false;
  numCheckboxesSelected = 0;
  checkedState: CheckedState[] = [];

  handleOnChange(position: number) {
    const updatedCheckedState = this.checkedState.map((element, index) => {
      if (position === index) {
        return {
          checked: !element.checked,
          backgroundColor: element.checked ? '#ffffff' : '#eeeeee',
        };
      }
      return element;
    });
    this.checkedState = updatedCheckedState;

    const totalSelected = this.checkedState.filter(
      (element) => element.checked
    ).length;

    this.numCheckboxesSelected = totalSelected;
    this.selectDeselectAllIsChecked = totalSelected === this.issues.length;
  }

  handleSelectDeselectAll(event: Event) {
    const { checked } = <HTMLInputElement>event.target;

    const allTrueArray: CheckedState[] = [];
    this.issues.forEach((element) => {
      if (element.status === 'open') {
        allTrueArray.push({ checked: true, backgroundColor: '#eeeeee' });
      } else {
        allTrueArray.push({ checked: false, backgroundColor: '#ffffff' });
      }
    });

    const allFalseArray: CheckedState[] = new Array(this.issues.length).fill({
      checked: false,
      backgroundColor: '#ffffff',
    });
    if (checked) {
      this.checkedState = allTrueArray;
    } else {
      this.checkedState = allFalseArray;
    }

    const totalSelected = (checked ? allTrueArray : allFalseArray)
      .map((element) => element.checked)
      .reduce((sum, currentState, index) => {
        if (currentState && this.issues[index].status === 'open') {
          return sum + this.issues[index].value;
        }
        return sum;
      }, 0);
    this.numCheckboxesSelected = totalSelected;
    this.selectDeselectAllIsChecked = !this.selectDeselectAllIsChecked;
  }
}
