import { Injectable } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private supabase: SupabaseService
  ) { }

  get session$(): Observable<Session> {
    return this.supabase.session$;
  }

  get authenticated$(): Observable<boolean> {
    return this.supabase.session$.pipe(
      map(session => session?.user.aud === 'authenticated' ? true : false)
    );
  }

  signInWithMail(email: string) {
    return this.supabase.signIn(email);
  }

  signInWithGoogle() {
    this.supabase.signInWithProvider('google').subscribe();
  }

  logOut(): void {
    this.supabase.signOut();
  }
}