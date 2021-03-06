import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from 'src/shared/models/company.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  serviceUrl = 'company';

  private _companySource = new BehaviorSubject<Company>({} as Company);
  company$ = this._companySource.asObservable();
  company: Company;

  constructor(private afs: AngularFirestore) { }

  async getAndStore(companyId) {
    await this.get(companyId).subscribe((data: Company) => {
      this._companySource.next(data);
      this.company = data;
      this.company.id = companyId;
    });
  }

  create(company: Company) {
    delete company["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...company
    });
  }

  getAll() {
    return this.afs.collection(this.serviceUrl).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  get(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).valueChanges();
  }



  update(cid, company: Company) {
    console.log('Update ' + cid + " : " + this.serviceUrl + '/' + cid)
    console.log(company);
    delete company["id"]
    return this.afs.doc(this.serviceUrl + '/' + cid).update({
      ...company
    });
  }

  delete(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).delete();
  }
}
