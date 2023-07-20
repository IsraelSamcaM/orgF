import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/levels`).pipe(
      map(resp => {
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }
}