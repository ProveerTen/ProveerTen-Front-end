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
      withCredentials: false,
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
      withCredentials: false,
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
      withCredentials: false,
    });
  }

  deleteRequest(route: string, queries?: RequestOptions, headers?: RequestOptions) {
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

    return this.http.delete(route, {
      headers: reqHeaders,
      params: reqParams,
      responseType: "json",
      withCredentials: false,
    });
  }
}
