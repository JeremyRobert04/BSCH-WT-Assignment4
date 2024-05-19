import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
  constructor(private http: HttpClient) {}

  getCatgeories(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/topic/get-all-topics');
  }

  getLastQuestions(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:8080/subtopic/get-last-three-subtopics'
    );
  }
}
