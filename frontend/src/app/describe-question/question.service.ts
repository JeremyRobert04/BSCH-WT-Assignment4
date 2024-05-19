import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  submitNewAnswerForm(text: string, userId: number, subTopicId: string) {
    return this.http.post<any>(
      'http://localhost:8080/message/create-message/',
      {
        text: text,
        userId: userId,
        subTopicId: subTopicId,
      }
    );
  }

  getAnswers(subTopicId: string): Observable<any> {
    return this.http.get<any>(
      'http://localhost:8080/subtopic/get-subtopic/' + subTopicId
    );
  }

  upvoteMessage(messageId: number): Observable<any> {
    return this.http.put(
      'http://localhost:8080/message/upvote/' + messageId,
      {}
    );
  }

  deleteMessage(answerId: number): Observable<any> {
    return this.http.delete(
      'http://localhost:8080/message/delete-message/' + answerId
    );
  }
}
