import { Component } from '@angular/core';
import { HomeServiceService } from '../home-page/home-service.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories: any[] = [];
  backendUrl = 'http://localhost:8080';
  constructor(private categoriesService: HomeServiceService) {}

  ngOnInit(): void {
    this.categoriesService.getCatgeories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error occurred: ', error);
      },
    });
  }
}
