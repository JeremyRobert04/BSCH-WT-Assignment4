import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userKey = 'loggedInUser';

  constructor() {}

  // Store user information in local storage
  setUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Retrieve user information from local storage
  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Clear user information from local storage
  clearUser() {
    localStorage.removeItem(this.userKey);
  }
}
