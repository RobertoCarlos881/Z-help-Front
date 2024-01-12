import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, from, map, of, tap, throwError } from 'rxjs';

import { Storage } from '@ionic/storage-angular';

import { environment } from "src/environments/environment";
import { UserData, Contacts, Contact, CreateContact, CreateActivity, ActivityAll, UpdateUserResponse, VerPublicaciones } from '../interfaces/index';
import { PublicacionesGuardadas } from '../interfaces/publicaciones-guardadas.entity';

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

    updateUser(id: string, nombre: string, email: string, institucion: string, identificador_politecnico: number): Observable<UpdateUserResponse> {
        const url = `${this.baseUrl}/perfil/${id}`
        const body = { nombre: nombre, email: email, institucion: institucion, identificador_politecnico: identificador_politecnico }
        return this.http.patch<UpdateUserResponse>(url, body);
    }

    createActivity(latitud: string, longitud: string, idUsuario: number, accion: boolean): Observable<CreateActivity> {
        const url = `${this.baseUrl}/actividad`

        const body = { latitud: latitud, longitud: longitud, id_usuario: idUsuario, accion: accion }

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
        const body = { nombre_contacto: nombreContacto, numero_contacto: numeroContacto, id_usuario: idUsuario }

        return this.http.post<any>(url, body);
    }

    deleteContacto(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}/contactos/${id}`);
    }

    createPublicacion(id: number, latitud: number, longitud: number, texto_publicacion: string, incognito: boolean): Observable<any> {
        const url = `${this.baseUrl}/foro/publicacion`
        const body = { latitud: latitud, longitud: longitud, incognito: incognito, texto_publicacion: texto_publicacion, id_usuario: id }

        return this.http.post<any>(url, body);
    }

    createComentarioPublicacion() {
    }

    createPublicacionGuardada(id_usuario: number, id_publicacion: number) {
        const url = `${this.baseUrl}/foro/guardadas`
        const body = { id_usuario: id_usuario, id_publicacion: id_publicacion }

        return this.http.post<any>(url, body);
    }

    async findAllPublications(id: string): Promise<VerPublicaciones[] | undefined> {
        try {
            const publicaciones = await this.http.get<VerPublicaciones[]>(`${this.baseUrl}/foro/publicacion/${id}`).toPromise();
            return publicaciones;
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
            throw error;
        }
    }

    async findByIdComentariosPublications() {
    }

    async findOnePublications(id: string): Promise<VerPublicaciones | undefined> {
        try {
            const publicacion = await this.http.get<VerPublicaciones>(`${this.baseUrl}/foro/publicacionuser/${id}`).toPromise();
            return publicacion;
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
            throw error;
        }
    }

    async findOnePublicationsGuardadas(id: string): Promise<PublicacionesGuardadas | undefined>  {
        try {
            const publicacionGuardada = await this.http.get<PublicacionesGuardadas>(`${this.baseUrl}/foro/guardadas/${id}`).toPromise();
            return publicacionGuardada;
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
            throw error;
        }
    }

    deletePublicacion(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}/foro/publicacion/${id}`);
    }

    deletePublicacionGuardada(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.baseUrl}/foro/guardadas/${id}`);
    }

}