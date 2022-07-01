import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //IBS
  private readonly urlBase = 'http://192.168.90.58:3000/';

  //HOME
  //private readonly urlBase = 'http://192.168.0.108:3000/';

  private authToken: string;

  constructor(
    private httpClient: HttpClient,
    private readonly router: Router,
  ) {
    this.authToken = localStorage.getItem("token");
  }

  //----------------------------------------------------------------

  //OPTIONS

  private getHeaders() {
    this.verifyTokenExpiration();
    return {
      'Content-Type': 'application/json',
      ...(this.authToken && {
        'Authorization': 'Bearer ' + this.authToken
      })
    };
  }

  private verifyTokenExpiration() {
    if (this.authToken) {
      const [, payload] = this.authToken.split(".");
      const decoded = JSON.parse(atob(payload));
      if (decoded.exp) {
        const dataExpiracao = new Date(decoded.exp * 1000);
        const diff = dataExpiracao.getTime() - (new Date()).getTime()
        if (diff <= 0) {
          this.logout();
        }
      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  logout() {
    this.authToken = null;
    window.localStorage.removeItem('token');
    this.router.navigate(["login"]);
  }

  private setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem("token", token);
  }

  //----------------------------------------------------------------

  //GET REQUEST

  async get(endpoint: string, query?: Record<string, any>): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
    const result = await firstValueFrom(this.httpClient.get(this.urlBase + endpoint, {
      headers: this.getHeaders(),
      params: query,
      observe: 'response'
    })) as HttpResponse<any>;

    return {
      responseBody: result.body,
      statusCode: result.status,
    }
  }

  //POST REQUEST

  async post(endpoint: string, body: Record<string, any>, query?: Record<string, any>): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
    const result = await firstValueFrom(this.httpClient.post(this.urlBase + endpoint, body, {
      headers: this.getHeaders(),
      params: query,
      observe: 'response'
    })) as HttpResponse<any>;

    let resBody
    if (result.body) {
      resBody = result.body
      if (resBody.access_token) {
        this.authToken = resBody.access_token
      }

      this.isAuthenticated()
    }

    this.setAuthToken(this.authToken)

    return {
      responseBody: result.body,
      statusCode: result.status,
    }
  }

  //PUT REQUEST

  async put(endpoint: string, body: Record<string, any>, query?: Record<string, any>): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
    const result = await firstValueFrom(this.httpClient.put(this.urlBase + endpoint, body, {
      headers: this.getHeaders(),
      params: query,
      observe: 'response'
    })) as HttpResponse<any>;

    return {
      responseBody: result.body,
      statusCode: result.status,
    }

  }

  //PATCH REQUEST

  async patch(endpoint: string, body: Record<string, any>, query?: Record<string, any>): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
    const result = await firstValueFrom(this.httpClient.patch(this.urlBase + endpoint, body, {
      headers: this.getHeaders(),
      params: query,
      observe: 'response'
    })) as HttpResponse<any>;

    return {
      responseBody: result.body,
      statusCode: result.status,
    }

  }

  //DELETE REQUEST

  async delete(endpoint: string, query?: Record<string, any>): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
    const result = await firstValueFrom(this.httpClient.delete(this.urlBase + endpoint, {
      headers: this.getHeaders(),
      params: query,
      observe: 'response'
    })) as HttpResponse<any>;

    return {
      responseBody: result.body,
      statusCode: result.status,
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------

  // OLD ROUTE SYSTEM

  // private async request(
  //   type: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
  //   endpoint: string,
  //   body?: Record<string, any>,
  //   query?: Record<string, any>
  // ): Promise<{ statusCode: number, responseBody: Record<string, any> }> {
  //   return new Promise((resolve, reject) => {

  //     const req = new XMLHttpRequest();
  //     const url = this.urlBase + endpoint + (
  //       query
  //         ? `?${Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join("&")}`
  //         : ""
  //     );

  //     req.open(type, url, true);
  //     req.setRequestHeader('Content-Type', 'application/json')
  //     if (this.authToken) {
  //       req.setRequestHeader("Authorization", "Bearer " + this.authToken);
  //     }
  //     req.send(JSON.stringify(body));

  //     req.addEventListener('load', r => {
  //       let resBody;
  //       if (req.responseText) {
  //         resBody = JSON.parse(req.responseText);

  //         if (resBody.access_token) {
  //           this.setAuthToken(resBody.access_token);

  //         }

  //         this.isAuthenticated()
  //       }

  //       resolve({
  //         statusCode: req.status,
  //         responseBody: resBody,
  //       });
  //     });
  //     req.addEventListener('error', e => reject(e));
  //     req.addEventListener('abort', e => reject(e));
  //   });
  // }

  //-------------------------------------------------------------------------------------------------------------------------------------------

}