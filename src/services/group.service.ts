import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Group } from 'src/shared/models/group.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  serviceUrl = 'gropus';

  private _groupSource = new BehaviorSubject<Group[]>([]);
  gropus$ = this._groupSource.asObservable();
  gropus: Group[] = [];
  companyId;

  constructor(private afs: AngularFirestore) {
    
  }

  create(group: Group) {
    delete group["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...group
    });
  }

  getAndStoreAll(companyId) {
    return this.afs
      .collection(this.serviceUrl, ref =>
        ref.where('companyId', '==', companyId).orderBy('serialNo')
      )
      .snapshotChanges()
      .subscribe(data => {
        this.gropus = [];
        data.forEach(resp => {
          let cls = resp.payload.doc.data() as Group;
          cls.id = resp.payload.doc.id;
          this.gropus.push(cls);
        });
        this._groupSource.next(this.gropus);
      });
  }

  getAll(companyId) {
    return this.afs.collection(this.serviceUrl, ref =>
      ref.where('companyId', '==', companyId).orderBy('serialNo'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Group;
          const id = a.payload.doc.id;
          return { id, ...data };
        })));
  }

  get(gid) {
    return this.afs.doc(this.serviceUrl + '/' + gid).valueChanges();
  }

  update(gid, group: Group) {
    delete group["id"]
    return this.afs.doc(this.serviceUrl + '/' + gid).update({
      ...group
    });
  }

  delete(gid) {
    return this.afs.doc(this.serviceUrl + '/' + gid).delete();
  }
}
