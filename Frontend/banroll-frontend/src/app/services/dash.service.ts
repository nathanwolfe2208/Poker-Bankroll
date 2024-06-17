import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DashService {

    private urlGet = 'http://localhost:3000/api/v1/users';
    private urlGetSes = 'http://localhost:3000/api/v1/sessions';
    private urlPost = 'http://localhost:3000/api/v1/sessions';
    private urlDel = 'http://localhost:3000/api/v1/sessions/';
    private urlPut = 'http://localhost:3000/api/v1/users'
    Sessions: any[] | PromiseLike<any[]> = [];

    constructor(private http: HttpClient) {}

    async getUser(id: number): Promise<any> {
        return await lastValueFrom(this.http.get<any>(`${this.urlGet}/${id}`));
    }

    async submitSession(session: {user_id: number, buyIn: number, cashOut: number, timePlayed: number}): Promise<any> {
        return await lastValueFrom(this.http.post<any>(this.urlPost, session));
    }

    async updateUser(): Promise<any> {
        const putUser = `${this.urlPut}/1`;
        const response = this.http.put(putUser, {});
        return await lastValueFrom(response);
    }

    async sessionsByUser(): Promise<any[]> {
       return await lastValueFrom(this.http.get<any[]>(this.urlGetSes));
    }

    async deleteSession(id : string): Promise<any> {
        return await lastValueFrom(this.http.delete(`${this.urlDel + id}`));
    }

}