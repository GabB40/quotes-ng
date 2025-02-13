import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Citation } from './citation.interface';


@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private http = inject(HttpClient);
  citation$ = signal<Citation | null>(null)
  readonly url = 'https://dummyjson.com/quotes/random';

  get citation() {
    return this.citation$.asReadonly();
  }
  getRandomCitation(): void {
    this.http.get<Citation>(this.url)
    .subscribe(response => this.citation$.set(response));
  }
}
