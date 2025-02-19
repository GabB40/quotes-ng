import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Citation } from './citation.interface';


@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private http = inject(HttpClient);
  citation$ = signal<Citation | null>(null)
  // readonly url = 'https://dummyjson.com/quotes/random';
  readonly url = 'https://mw965ywr2j.execute-api.eu-west-3.amazonaws.com/dev/citation';
  // readonly url = 'https://cors-anywhere.herokuapp.com/https://mw965ywr2j.execute-api.eu-west-3.amazonaws.com/dev/citation?format=json';
  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  get citation() {
    return this.citation$.asReadonly();
  }
  getRandomCitation(): void {
    this.http.get<Citation>(this.url, {"headers": this.corsHeaders})
    .subscribe(response => {
      console.log("response", response)
      console.log("response", typeof response)
      this.citation$.set(response)
    });
  }
}
