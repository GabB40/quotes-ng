import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { Citation } from './citation.interface';


@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private http = inject(HttpClient);
  private url = 'https://mw965ywr2j.execute-api.eu-west-3.amazonaws.com/dev/citation'; // url custom Lambda via API Gateway

  private randomCitationResource = rxResource({
    loader: () => this.http.get<Citation>(this.url).pipe(
      // delay(500) //ajout délai pour test spinner
    )
  });

  randomCitation = computed(() => this.randomCitationResource.value());
  getNewRandomCitation = () => this.randomCitationResource.reload();

  isLoading = this.randomCitationResource.isLoading;

  // gestion des éventuelles erreurs
  private error = this.randomCitationResource.error;
  errorMessage = computed(() => {
    const httpError = this.error() as HttpErrorResponse;
    return httpError ? httpError?.error.message ?? "erreur inconnue" : null;
  })
  private logError = effect(() => {
    if (this.error()) console.error("ERROR", this.error());
  })
}
