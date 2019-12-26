import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  create(user) {
    return this.afs.collection('users').add(user);
  }

  saveRegisteredUser(uid, name, email, password) {
    return this.afs.collection('users').doc(uid).set({
      name: name,
      email: email,
      password: password,
      roles: 'USER'
    });
  }
}
