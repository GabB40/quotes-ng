import { Injectable, inject, signal } from '@angular/core';
import { Citation } from './citation.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private http = inject(HttpClient);
  defaultCitation: Citation = {
    q: "Tout vient à point à qui sait attendre",
    a: "François Rabelais",
    h: "string"
  }
  citation = signal<Citation>(this.defaultCitation)
  readonly url = 'https://zenquotes.io/api/random';

  getRandomCitations(): Observable<Citation[]> {
    return this.http.get<Citation[]>(this.url).pipe(
      tap(citations => {
        console.log("citations", citations)
        this.citation.set(citations[0])
      })
    );
  }
}
