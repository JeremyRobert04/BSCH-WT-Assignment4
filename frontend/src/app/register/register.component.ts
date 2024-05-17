import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  title = 'Register Page';

  constructor(private http: HttpClient) { }

  userRegister(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    const professional = false;
    const verified = true;
    
    const registerData = { firstName, lastName, email, password, professional, verified};

    this.http.post('http://localhost:8080/register', registerData)
    .subscribe(response => {
      console.log('Registration successful:', response);
      window.location.href = '/login';
    }, error => {
      console.error('Registration failed:', error);
      console.error('Complete error object:', error);
    });
  }
}
