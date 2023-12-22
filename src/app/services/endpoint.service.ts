import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { Storage } from '@ionic/storage-angular';

import { environment } from "src/environments/environment";
import { User } from '../auth/interface';

@Injectable({
    providedIn: 'root'
})
export class EndpointService {
    user$?: Promise<any>;
    userId$?: Promise<number>;

    private storage: Storage | null = null;
    private readonly baseUrl: string = environment.API_URL;
    private http = inject(HttpClient);

    constructor(private storageService: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storageService.create();
        this.storage = storage;
    }

    cargarUsuario() {
        this.user$ = this.storage?.get('user')
            .then(user => user)
            .catch(error => {
                console.error("Error al obtener el usuario:", error);
                return null;
            });
        this.userId$ = this.extractUserId();
    }

    private async extractUserId(): Promise<number> {
        try {
            const user = await this.user$;
            return user ? user.id_usuario : null;
        } catch (error) {
            console.error("Error al extraer el ID del usuario:", error);
            return 0;
        }
    }

    getUser(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/perfil/${id}`)
            .pipe(
                catchError(error => of(undefined))
            );
    }

    deleteUser(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}/perfil/${id}`)
            .pipe(
                map(resp => true),
                catchError(err => of(false))
            );
    }

    // updateUser(id: string, ): Observable<any> {
    //     const url = `${this.baseUrl}/perfil/${id}`
    //     const body = { numero_telefonico: telefono, password: password }

    //     return this.http.post<any>(url, body)
    //         .pipe(
    //             map(({ user, token }) => this.setAuthentication(user, token)),
    //             catchError(err => throwError(() => err.error.message)
    //             )
    //         );
    // }

}