import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  readonly PaginationRestAPI = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { }

  fetchPosts(): Observable<any> {
    return this.httpClient.get(this.PaginationRestAPI);
  }

}
