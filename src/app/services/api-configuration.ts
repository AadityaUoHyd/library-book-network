/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  //rootUrl: string = 'http://localhost:8080/api/v1';
  rootUrl: string = environment.backendUrl;
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
