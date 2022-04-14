import { Injectable } from '@angular/core';
import { ɵparseCookieValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly urlBase = 'http://localhost:3000/';

  private authToken: string;

  constructor() {
    // TODO recuperar token do cookie, caso exista
  }

  private async request(type: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH', endpoint: string, body?: Record<string, any>): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
    return new Promise((resolve, reject) => {

      const req = new XMLHttpRequest();
      const url = this.urlBase + endpoint;

      req.open(type, url, true);
      req.setRequestHeader('Content-Type', 'application/json')
      if (this.authToken) {
        req.setRequestHeader('Authorization', `Bearer ${this.authToken}`);
      }
      req.send(JSON.stringify(body));

      req.addEventListener('load', r => {
        console.log(req.responseText);
        if (req.responseText) {
          const resBody = JSON.parse(req.responseText);

          if (resBody.access_token) {
            this.setAuthToken(resBody.access_token);
          }
          resolve({
            statusCode: req.status,
            responseBody: resBody,
          });
        }
      });
      req.addEventListener('error', e => reject(e));
      req.addEventListener('abort', e => reject(e));
    });
  }

  private setAuthToken(token: string) {
    this.authToken = token;
  }

  async get(endpoint: string) {
    return await this.request('GET', endpoint);
  }

  async post(endpoint: string, body: Record<string, any>) {
    return await this.request('POST', endpoint, body);
  }
}
