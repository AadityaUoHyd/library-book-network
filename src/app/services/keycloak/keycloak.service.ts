import {Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-profile';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak;
  private _profile: UserProfile | undefined;
  private _isInitialized = false;

  constructor() {
    this._keycloak = new Keycloak({
      url: environment.keycloakUrl,
      realm: environment.keycloakRealm,
      clientId: environment.keycloakClientId
    });
  }

  get keycloak() {
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init(): Promise<void> {
    if (this._isInitialized) return;

    const authenticated = await this._keycloak.init({
      onLoad: 'login-required',
      redirectUri: environment.frontendUrl + window.location.pathname,
      checkLoginIframe: false // Disable iframe to prevent loops
    });

    if (authenticated) {
      this._profile = (await this._keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this._keycloak.token || '';
      this._isInitialized = true;
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  login() {
    return this._keycloak.login();
  }

  logout() {
    return this._keycloak.logout({ redirectUri: environment.frontendUrl });
  }

  manageProfile() {
    return this._keycloak.accountManagement();
  }
}
