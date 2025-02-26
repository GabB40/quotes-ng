import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CitationService } from './citation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private citationService = inject(CitationService);
  randomCitation = this.citationService.randomCitation
  isLoading = this.citationService.isLoading;
  errorMessage = this.citationService.errorMessage;

  getNewRandomCitation() {
    this.citationService.getNewRandomCitation()
  }
}
