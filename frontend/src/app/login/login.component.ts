import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { LoginResponse } from '../models/login-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [HttpClientModule]
})
export class LoginComponent {
  title = 'Login Page';

  constructor(private http: HttpClient, private userService: UserService) {}

  userLogin(email: string, password: string) {
    const loginData = { email, password };

    this.http.post<LoginResponse>('http://localhost:8080/login', loginData)
    .subscribe(response => {
      console.log('Login successful:', response);

      // Store user information
      const user = response['user'];
      this.userService.setUser(user);
      
      window.location.href = '/';
      
    }, error => {
      console.error('Login failed:', error);
      console.error('Complete error object:', error);
    });
  }
}
