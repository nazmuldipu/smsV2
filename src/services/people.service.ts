import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { People } from 'src/shared/models/people.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  serviceUrl = 'peoples';

  private _peopleSource = new BehaviorSubject<People[]>([]);
  peoples$ = this._peopleSource.asObservable();
  peoples: People[] = [];

  constructor(private afs: AngularFirestore) { }

  create(people: People) {
    delete people["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...people
    });
  }

  getAndStoreAll(companyId) {
    return this.afs.collection(this.serviceUrl, ref =>
      ref.where('companyId', '==', companyId).orderBy('serialNo'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as People;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))).subscribe(data => {
          this._peopleSource.next(data);
        });
  }

  getAll(companyId) {
    return this.afs.collection(this.serviceUrl, ref =>
      ref.where('companyId', '==', companyId).orderBy('serialNo'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as People;
          const id = a.payload.doc.id;
          return { id, ...data };
        })));
  }

  get(pid) {
    return this.afs.doc(this.serviceUrl + '/' + pid).valueChanges();
  }

  update(gid, people: People) {
    delete people["id"]
    return this.afs.doc(this.serviceUrl + '/' + gid).update({
      ...people
    });
  }

  delete(pid) {
    return this.afs.doc(this.serviceUrl + '/' + pid).delete();
  }
}
