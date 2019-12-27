import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  getUser$() {
    return this.user$;
  }

  register(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(data => {
        console.log('SIGNOUT');
      })
      .catch(error => {
        console.log('SIGNOUT ERROR', error);
      })
  }
}
