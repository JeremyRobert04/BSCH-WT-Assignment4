import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from './category.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-describe-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './describe-category.component.html',
  styleUrl: './describe-category.component.scss',
  animations: [
    trigger('displayState', [
      state('false', style({ overflow: 'hidden', height: '0px' })),
      state('true', style({ overflow: 'hidden', height: '*' })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('200ms ease-out')),
    ]),
  ],
})
export class DescribeCategoryComponent implements OnInit {
  categoryService = inject(CategoryService);
  categoryName: string | null = null;
  categoryId: string | null = null;
  topics: any[] = [];
  openForm: boolean = false;
  questionForm = new FormGroup({
    name: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  submitQuestion(): void {
    this.categoryService
      .submitNewQuestionForm(
        this.questionForm.value.name ?? '',
        this.questionForm.value.content ?? '',
        parseInt(this.categoryId ?? '-1')
      )
      .subscribe({
        next: (data) => {
          this.openForm = false;
          this.questionForm.reset();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.categoryName = params.get('name');
      this.categoryId = params.get('categoryId');
      if (!this.categoryName || !this.categoryId) {
        this.router.navigate(['/categories']);
        return;
      }
    });

    this.categoryService.getAllQuestions(this.categoryId ?? '-1').subscribe({
      next: (data) => {
        console.log(data);
        this.topics = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
