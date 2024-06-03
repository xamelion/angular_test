import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ITableIssueViewModel,
  IssueStatus,
  TableIssue,
} from '../../model/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() set issues(value: TableIssue[]) {
    this._issues = value.map((issue) => ({
      ...issue,
      isOpen: issue.status === IssueStatus.Open,
    }));

    this.checkedState = Array(value.length).fill(false);

    this.openIssuesCount = this.issues.filter((issue) => issue.isOpen).length;
  }
  get issues(): ITableIssueViewModel[] {
    return this._issues;
  }
  private _issues: ITableIssueViewModel[] = [];

  private openIssuesCount = 0;

  selectDeselectAllIsChecked = false;
  numCheckboxesSelected = 0;
  checkedState: boolean[] = [];

  handleOnChange(position: number) {
    this.checkedState = this.checkedState.map((isChecked, index) =>
      position === index ? !isChecked : isChecked
    );

    const totalSelected = this.checkedState.filter(Boolean).length;

    this.numCheckboxesSelected = totalSelected;
    this.selectDeselectAllIsChecked = totalSelected === this.openIssuesCount;
  }

  handleSelectDeselectAll() {
    this.selectDeselectAllIsChecked = !this.selectDeselectAllIsChecked;

    this.checkedState = this.issues.map(
      (issue) => issue.isOpen && this.selectDeselectAllIsChecked
    );

    this.numCheckboxesSelected = this.selectDeselectAllIsChecked
      ? this.openIssuesCount
      : 0;
  }
}
