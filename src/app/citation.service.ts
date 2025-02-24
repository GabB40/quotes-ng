import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  // pour l'ajout d'une API KEY, après sa création dans la console API GATEWAY, il faut créer un 'usage plan' et l'associer à la clé puis à l'API dans 'Associated stages'
  private httpHeader: HttpHeaders = new HttpHeaders({
    "x-api-key": "Yh2dpc1iW2aeKzDLOoicj6Wea4febYpW2dgyKlSj"
  })
  
  private randomCitationResource = rxResource({
    loader: () => this.http.get<Citation>(this.url, { headers: this.httpHeader }).pipe(
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
