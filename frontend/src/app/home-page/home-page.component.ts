import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeServiceService } from './home-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  title = 'Home Page';
  categories: any[] = [];
  lastQuestions: any[] = [];
  backendUrl = 'http://localhost:8080';

  constructor(private homeService: HomeServiceService) {}

  ngOnInit(): void {
    this.homeService.getCatgeories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error occurred: ', error);
      },
    });

    this.homeService.getLastQuestions().subscribe({
      next: (data) => {
        this.lastQuestions = data;
        console.log(this.lastQuestions);
      },
      error: (error) => {
        console.error('Error occurred: ', error);
      },
    });
  }
}
