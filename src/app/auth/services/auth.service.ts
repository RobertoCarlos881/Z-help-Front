import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { Storage } from '@ionic/storage-angular';

import { environment } from "src/environments/environment";
import { User, LoginResponse, CheckTokenResponse } from '../interface/index';
import { AuthStatus } from '../enum/index';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private storage: Storage | null = null;
    private readonly baseUrl: string = environment.API_URL;
    private http = inject(HttpClient);

    private _currentUser = signal<User | null>(null);
    private _authStatus = signal<AuthStatus>(AuthStatus.checking);

    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus());

    constructor(private storageService: Storage) {
        this.checkAuthStatus().subscribe();
        this.init();
    }

    async init() {
        const storage = await this.storageService.create();
        this.storage = storage;
    }

    private setAuthentication(user: User, token: string): boolean {        
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        this.storage?.set('authenticated', AuthStatus.authenticated);
        this.storage?.set('token', token);
        this.storage?.set('user', user);

        return true;
    }

    login(telefono: string, password: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/login`
        const body = { numero_telefonico: telefono, password: password }

        return this.http.post<LoginResponse>(url, body)
            .pipe(
                map(({ user, token }) => this.setAuthentication(user, token)),
                catchError(err => throwError(() => err.error.message)
                )
            );
    }

    register(telefono: string, password: string): Observable<boolean> {
        const url = `${this.baseUrl}/auth/register`
        const body = { numero_telefonico: telefono, password: password }
        
        return this.http.post<LoginResponse>(url, body)
            .pipe(
                map(({ user, token }) => this.setAuthentication(user, token)),
                catchError(err => throwError(() => err.error.message)
                )
            );
    }

    checkAuthStatus(): Observable<boolean> {
        const url = `${this.baseUrl}/auth/check-token`;
        const token = this.storage?.get('token');

        if (!token) {
            this.logout();
            return of(false);
        };

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<CheckTokenResponse>(url, { headers })
            .pipe(
                map(({ user, token }) => this.setAuthentication(user, token)),
                catchError(() => {
                    this._authStatus.set(AuthStatus.notAuthenticated)
                    return of(false)
                })
            );
    }

    logout() {
        this.storage?.remove('token');
        this._currentUser.set(null);
        this._authStatus.set(AuthStatus.notAuthenticated);
        this.storage?.set('authenticated', AuthStatus.notAuthenticated)
        this.storage?.remove('user')
    }
}
