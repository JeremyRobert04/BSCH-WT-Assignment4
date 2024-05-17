import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [HttpClientModule]
})
export class LoginComponent {
  title = 'Login Page';

  constructor(private http: HttpClient) {}

  userLogin(email: string, password: string) {
    const loginData = { email, password };

    this.http.post('http://localhost:8080/login', loginData)
    .subscribe(response => {
      console.log('Login successful:', response);
      window.location.href = '/';
      
    }, error => {
      console.error('Login failed:', error);
      console.error('Complete error object:', error);
    });
  }
}
