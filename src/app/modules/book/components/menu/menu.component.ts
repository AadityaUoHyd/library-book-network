import {Component, OnInit} from '@angular/core';
import {KeycloakService} from '../../../../services/keycloak/keycloak.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BookService} from '../../../../services/services/book.service';
import {BookResponse} from '../../../../services/models/book-response';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  firstname:string='admin';

  constructor(
    private keycloakService: KeycloakService,
    private bookService: BookService
  ) {
  }
    ngOnInit(): void {

     const token = this.keycloakService.keycloak.token;
     if (token) {
         const jwtHelper = new JwtHelperService();
         const decodedToken = jwtHelper.decodeToken(token);
         const nameComponents = decodedToken.name.split(' ');
         this.firstname= nameComponents[0];
     }

      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

  async logout() {
    await this.keycloakService.logout();
  }

  async manageProfile() {
    await this.keycloakService.manageProfile();
  }

}
