import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  register(email, password) {
    console.log(email, password);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
