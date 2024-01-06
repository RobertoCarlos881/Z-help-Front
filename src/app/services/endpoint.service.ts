import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, from, map, of, tap, throwError } from 'rxjs';

import { Storage } from '@ionic/storage-angular';

import { environment } from "src/environments/environment";
import { User } from '../auth/interface';
import { UserData } from '../interfaces/index';

@Injectable({
    providedIn: 'root'
})
export class EndpointService {
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

    async getUbicacion() {
        let position = await this.storage?.get('ubicacion');

        const lat = position.actual.lat;
        const lng = position.actual.lng;
        const datosUbicacion = [lat, lng];

        console.log(datosUbicacion);
        return datosUbicacion;
    }

    async getUserData() {
        let user = await this.storage?.get('user');

        const idUsuario = user.id_usuario;

        console.log(idUsuario);
        return idUsuario;
    }

    async getUser(id: string): Promise<UserData | undefined> {
        try {
            const userData = await this.http.get<UserData>(`${this.baseUrl}/perfil/${id}`).toPromise();
            return userData;
          } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
            throw error;
        }
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

    createActivity(): Observable<any> {
        const url = `${this.baseUrl}/actividad`
        const body = {}
        return this.http.post<any>(url, body)
    }

    getActivities() {

    }

}