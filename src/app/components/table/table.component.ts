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

  getStylesTr(issue: TableIssue) {
    return issue.status === 'open' ? 'openIssue' : 'closedIssue';
  }

  onClick(index: number, issue: TableIssue) {
    if (issue.status === 'open') {
      this.handleOnChange(index);
    }
  }

  handleOnChange(position: number) {
    const updatedCheckedState = this.checkedState.map((element, index) => {
      if (position === index) {
        return {
          ...element,
          checked: !element.checked,
          backgroundColor: element.checked ? '#ffffff' : '#eeeeee',
        };
      }
      return element;
    });
    this.checkedState = updatedCheckedState;

    const totalSelected = updatedCheckedState
      .map((element) => element.checked)
      .reduce((sum, currentState, index) => {
        if (currentState) {
          return sum + this.issues[index].value;
        }
        return sum;
      }, 0);
    this.numCheckboxesSelected = totalSelected;
    console.log;
    this.handleIndeterminateCheckbox(totalSelected);
  }

  handleIndeterminateCheckbox(total: number) {
    let count = 0;

    this.issues.forEach((element) => {
      if (element.status === 'open') {
        count += 1;
      }
    });

    if (total === 0) {
      this.selectDeselectAllIsChecked = false;
    }
    if (total > 0 && total < count) {
      this.selectDeselectAllIsChecked = false;
    }
    if (total === count) {
      this.selectDeselectAllIsChecked = true;
    }
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
