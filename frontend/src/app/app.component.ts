import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  opened = false;
  faCircleChevronRight = faCircleChevronRight;;

  public hamburgerAnimation(event: MouseEvent): void {
    const button = event.currentTarget as HTMLButtonElement;
    const currentState = button.getAttribute('data-state');

    if (!currentState || currentState === 'closed') {
      button.setAttribute('data-state', 'opened');
      button.setAttribute('aria-expanded', 'true');
    } else {
      button.setAttribute('data-state', 'closed');
      button.setAttribute('aria-expanded', 'false');
    }
  }
}
