import { UserData } from "./user-data.interface";

export interface CreateContact {
    nombre_contacto: string;
    numero_contacto: string;
    usuarios:        UserData;
    id_contacto:     number;
}