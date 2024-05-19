import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  submitNewQuestionForm(
    title: string,
    question: string,
    topicId: number
  ): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/subtopic/create-subtopic/',
      {
        name: title,
        description: question,
        topicId: topicId,
      }
    );
  }

  getAllQuestions(categoryId: string): Observable<any> {
    return this.http.get<any>(
      'http://localhost:8080/subtopic/get-subtopics/' + categoryId
    );
  }
}
