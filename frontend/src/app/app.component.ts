import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './user/user.service';
import { CommonModule } from '@angular/common';
import { AppService } from './app-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  opened = false;
  faCircleChevronRight = faCircleChevronRight;;
  isConnected = false;
  subtopics: any[] = [];
  filteredSubtopics: any[] = [];
  searchValue = '';
  searchForm: FormGroup;

  constructor(
    private userService: UserService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router) {

    const user = this.userService.getUser();

    this.searchForm = this.fb.group({
      searchValue: [''],
    });

    if (user)
      this.isConnected = true;
  }

  ngOnInit(): void {
    this.fetchData();
    this.searchForm.get('searchValue')?.valueChanges
      .subscribe((value) => {
        this.filterSubtopics(value);
      });
  }

  public hamburgerAnimation(event: MouseEvent): void {
    const button = event.currentTarget as HTMLButtonElement;
    const currentState = button.getAttribute('data-state');

    if (!currentState || currentState === 'closed') {
      button.setAttribute('data-state', 'opened');
      button.setAttribute('aria-expanded', 'true');
    } else {
      button.setAttribute('data-state', 'closed');
      button.setAttribute('aria-expanded', 'false');
    }
  }

  logout(): void {
    this.userService.clearUser();
    this.isConnected = false;
  }

  fetchData(): void {
    this.appService.getAllSubtopics().subscribe({
      next: (data) => {
        this.subtopics = data;
        this.filterSubtopics(this.searchForm.get('searchValue')?.value);
      },
      error: (error) => {
        console.error('Error occurred: ', error);
      },
    });
  }

  filterSubtopics(searchValue: string): void {
    if (!searchValue) {
      this.filteredSubtopics = this.subtopics;
    } else {
      this.filteredSubtopics = this.subtopics.filter(subtopic =>
        subtopic.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  onSearchSubmit(): void {
    const searchValue = this.searchForm.get('searchValue')?.value ?? '';
    this.filterSubtopics(searchValue);
  }
}
