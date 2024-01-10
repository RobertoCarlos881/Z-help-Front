import { UserData } from "./user-data.interface";

export interface CreatePublicacion {
    latitud:           number;
    longitud:          number;
    texto_publicacion: string;
    incognito:         boolean;
    usuarios:          UserData;
    id_publicaciones:  number;
    archivo_imagen:    string;
    created_at:        Date;
    updated_at:        Date;
}