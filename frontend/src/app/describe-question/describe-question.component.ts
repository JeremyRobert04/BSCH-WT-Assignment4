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
  answers: any[] = [];
  sortedAnswers: any[] = [];
  sortValue: string = 'upvote';

  answerForm = new FormGroup({
    text: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user = userService.getUser();
  }

  sortAnswers() {
    if (this.sortValue === 'date-asc') {
      this.sortedAnswers = this.answers.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (this.sortValue === 'date-desc') {
      this.sortedAnswers = this.answers.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (this.sortValue === 'upvote') {
      this.sortedAnswers = this.answers.sort((a, b) => b.upVotes - a.upVotes);
    }
  }

  onSortChange(event: Event) {
    this.sortValue = (event.target as HTMLSelectElement).value;
    this.sortAnswers();
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
        this.answers = this.question.messages;
        this.sortedAnswers = [...this.answers];
        this.sortAnswers();
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

  deleteAnswer(answerId: number): void {
    this.questionService.deleteMessage(answerId).subscribe({
      next: (data) => {
        this.getAnswers();
      },
      error: (error) => {
        console.error('Error while upvoting comment: ', error);
      },
    });
  }
}
