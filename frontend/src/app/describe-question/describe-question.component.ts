import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from './question.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-describe-question',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './describe-question.component.html',
  styleUrl: './describe-question.component.scss',
})
export class DescribeQuestionComponent {
  questionService = inject(QuestionService);
  categoryName: string | null = null;
  questionId: string = '';
  user: any = null;
  question: any = {};

  answerForm = new FormGroup({
    text: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user = userService.getUser();
  }

  submitAnswer(): void {
    this.questionService
      .submitNewAnswerForm(
        this.answerForm.value.text ?? '',
        this.user.userId,
        this.questionId
      )
      .subscribe({
        next: (data) => {
          this.getAnswers();
          this.answerForm.reset();
        },
        error: (error) => {
          console.error('Error while posting comment: ', error);
        },
      });
  }

  getAnswers(): void {
    this.questionService.getAnswers(this.questionId).subscribe({
      next: (data) => {
        this.question = data;
      },
      error: (error) => {
        console.error('An error occurred: ', error);
      },
    });
  }

  upvoteMessage(messageId: number): void {
    this.questionService.upvoteMessage(messageId).subscribe({
      next: (data) => {
        this.getAnswers();
      },
      error: (error) => {
        console.error('Error while upvoting comment: ', error);
      },
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.categoryName = params.get('categoryName');
      this.questionId = params.get('questionId') ?? '';
    });

    this.getAnswers();
  }
}
