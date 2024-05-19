import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getAllSubtopics(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/subtopic/get-all-subtopics');
  }
}
