import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Citation } from './citation.interface';
import { concatMap, delay, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private http = inject(HttpClient);
  citation$ = signal<Citation | null>(null)
  isRequesting$ = signal<boolean>(true)
  readonly url = 'https://mw965ywr2j.execute-api.eu-west-3.amazonaws.com/dev/citation'; // url custom Lambda via API Gateway

  get citation() {
    return this.citation$.asReadonly();
  }

  get isRequesting() {
    return this.isRequesting$.asReadonly();
  }

  getRandomCitation(): void {
    this.http.get<Citation>(this.url).pipe(
      tap(response => {
        this.isRequesting$.set(true)
        return response
      }),
      // concatMap(response => of(response).pipe(delay(800))) // pour ajouter délai
    )
    .subscribe({
      next: response => this.citation$.set(response),
      error: error => {
        console.error("ERROR: ", error);
        this.citation$.set({
          "original_quote": "",
          "translated_quote": `Une erreur est survenue: '${error.error.message}'`,
          "author": "Gab"
        })
      },
      complete: () => this.isRequesting$.set(false)
    });
  }
}
