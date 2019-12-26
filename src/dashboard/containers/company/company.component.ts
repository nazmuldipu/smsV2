import { Component, OnInit } from '@angular/core';
import { Company } from 'src/shared/models/company.model';
import { CompanyService } from 'src/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: Company;
  companyList: Company[] = [];
  message = '';
  errorMessage = '';
  loadingData = false;
  sendingDate = false;

  constructor(private companyService: CompanyService) {
    this.company = new Company();
  }

  ngOnInit() {
    this.getAllCompany();
  }

  async getAllCompany() {
    this.loadingData = true;
    await this.companyService.getAll()
      .subscribe(data => {
        this.companyList = data;
        this.loadingData = false;
      });
  }

  onEdit(id) {
    this.company = this.companyList.find(cp => cp.id === id);
  }

  async onCreate(value: Company) {
    this.sendingDate = true;
    await this.companyService.create(value)
      .then(() => {
        this.sendingDate = false;
        this.message = "Company Saved"
      })
      .catch((error) => {
        this.sendingDate = false;
        this.errorMessage = "Company SAVING ERROR ! ", error;
      });

    this.clear();
  }

  async onUpdate(value: Company) {
    this.sendingDate = true;
    await this.companyService.update(this.company.id, value)
      .then(() => {
        this.sendingDate = false;
        this.message = "Company Updated"
      })
      .catch((error) => {
        this.sendingDate = false;
        this.errorMessage = "Company Updating ERROR ! ", error;
      });
    this.clear();
  }

  onDelete(id) {
    if (confirm('Are you sure to delete')) {
      this.companyService.delete(id)
        .then(() => {
          this.message = "Company Delete"
        })
        .catch((error) => {
          this.errorMessage = "Company Deleting ERROR ! ", error;
        });
      this.clear();
    }
  }

  clear() {
    this.company = new Company();
    this.message = '';
    this.errorMessage = '';
    this.sendingDate = false;
    this.loadingData = false;
  }

}
