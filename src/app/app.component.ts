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
  citation = this.citationService.citation

  ngOnInit() {
    this.citationService.getRandomCitation();
  }
}
