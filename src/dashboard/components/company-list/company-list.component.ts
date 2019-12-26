import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/shared/models/company.model';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  @Input() companyList: Company[];
  @Output() edit = new EventEmitter();

  editCompany(id) {
    this.edit.emit(id);
  }

}
