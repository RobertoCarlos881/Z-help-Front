import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, from, map, of, tap, throwError } from 'rxjs';

import { Storage } from '@ionic/storage-angular';

import { environment } from "src/environments/environment";
import { UserData, Contacts, Contact, CreateContact, CreateActivity, ActivityAll } from '../interfaces/index';

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

        return datosUbicacion;
    }

    async getUserData() {
        let user = await this.storage?.get('user');

        const idUsuario = user.id_usuario;

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
        return this.http.delete<boolean>(`${this.baseUrl}/perfil/${id}`);
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

    createActivity(latitud: string, longitud: string, idUsuario: number, accion: boolean): Observable<CreateActivity> {
        const url = `${this.baseUrl}/actividad`
        
        const body = {latitud: latitud, longitud: longitud, id_usuario: idUsuario, accion: accion}
        
        return this.http.post<CreateActivity>(url, body)
    }

    async getActivitiesAll(): Promise<ActivityAll[] | undefined> {
        try {
            const contactsData = await this.http.get<ActivityAll[]>(`${this.baseUrl}/actividad`).toPromise();
            return contactsData;
        } catch (error) {
            console.error("Error al obtener las actividades:", error);
            throw error;
        }
    }

    async getContactoAll(id: string): Promise<Contacts[] | undefined> {
        try {
            const contactsData = await this.http.get<Contacts[]>(`${this.baseUrl}/contactos/${id}`).toPromise();
            return contactsData;
        } catch (error) {
            console.error("Error al obtener los contactos del usuario:", error);
            throw error;
        }
    }

    async getContactoByOne(id: string): Promise<Contact | undefined> {
        try {
            const contactData = await this.http.get<Contacts>(`${this.baseUrl}/contactos/contacto/${id}`).toPromise();
            return contactData;
        } catch (error) {
            console.error("Error al obtener el contacto del usuario:", error);
            throw error;
        }
    }

    createContacto(nombreContacto: string, numeroContacto: string, idUsuario: number): Observable<any> {
        const url = `${this.baseUrl}/contactos`
        const body = { nombre_contacto: nombreContacto, numero_contacto: numeroContacto, id_usuario: idUsuario}

        return this.http.post<any>(url, body);
    }

    deleteContacto(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}/contactos/${id}`);
    }

}