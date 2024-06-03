import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { IssuesService } from './services/issues.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  issues$ = inject(IssuesService).getIssues$();
}
