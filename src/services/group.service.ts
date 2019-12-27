import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Group } from 'src/shared/models/group.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  serviceUrl = 'gropus';

  constructor(private afs: AngularFirestore) { }

  create(group: Group) {
    delete group["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...group
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
