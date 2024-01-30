import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

interface RequestOptions {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http: HttpClient) { }

  getRequest(route: string, queries?: RequestOptions, headers?: RequestOptions) {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();

    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.get(route, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: true,
    });
  }

  postRequest(route: string, data?: any, queries?: RequestOptions, headers?: RequestOptions) {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();

    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.post(route, data, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: true,
    });
  }

  patchRequest(route: string, data?: any, queries?: RequestOptions, headers?: RequestOptions) {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();

    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.patch(route, data, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: true,
    });
  }

  deleteRequest(route: string, data?: any, queries?: RequestOptions, headers?: RequestOptions) {
    let reqHeaders = new HttpHeaders();
    let reqParams = new HttpParams();
    console.log("desde client", data);
    
    if (headers) {
      Object.getOwnPropertyNames(headers).forEach((key) => {
        reqHeaders = reqHeaders.set(key, headers[key]);
      });
    }

    if (queries) {
      Object.getOwnPropertyNames(queries).forEach((key) => {
        reqParams = reqParams.set(key, queries[key]);
      });
    }

    return this.http.delete(route, {
      headers: reqHeaders,
      params: reqParams,
      // body: data, // Puedes pasar el cuerpo de la solicitud DELETE a través de la propiedad 'body'
      responseType: "json",
      withCredentials: true,
      
    });
  }
}
