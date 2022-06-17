import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly urlBase = 'http://192.168.90.58:3000/';

  private authToken: string;

  constructor(
    // private readonly router: Router
  ) {
    this.authToken = localStorage.getItem("token");
  }

  private async request(
    type: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
    endpoint: string,
    body?: Record<string, any>,
    query?: Record<string, any>
  ): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
    return new Promise((resolve, reject) => {

      const req = new XMLHttpRequest();
      const url = this.urlBase + endpoint + (
        query
          ? `?${Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join("&")}`
          : ""
      );

      req.open(type, url, true);
      req.setRequestHeader('Content-Type', 'application/json')
      if (this.authToken) {
        req.setRequestHeader("Authorization", "Bearer " + this.authToken);
      }
      req.send(JSON.stringify(body));

      req.addEventListener('load', r => {
        let resBody;
        if (req.responseText) {
          resBody = JSON.parse(req.responseText);

          if (resBody.access_token) {
            this.setAuthToken(resBody.access_token);

          }

          this.isAuthenticated()
        }

        resolve({
          statusCode: req.status,
          responseBody: resBody,
        });
      });
      req.addEventListener('error', e => reject(e));
      req.addEventListener('abort', e => reject(e));
    });
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  logout() {
    this.authToken = null;
    window.localStorage.removeItem('token')
  }

  private setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem("token", token);
  }

  async get(endpoint: string, query?: Record<string, any>) {
    return await this.request('GET', endpoint, undefined, query);
  }

  async post(endpoint: string, body: Record<string, any>, query?: Record<string, any>) {
    return await this.request('POST', endpoint, body, query);
  }

  async put(endpoint: string, body: Record<string, any>, query?: Record<string, any>) {
    return await this.request('PUT', endpoint, body, query);
  }

  async patch(endpoint: string, body: Record<string, any>, query?: Record<string, any>) {
    return await this.request('PATCH', endpoint, body, query);
  }

  async delete(endpoint: string, query?: Record<string, any>) {
    return await this.request('DELETE', endpoint, undefined, query);
  }
}
