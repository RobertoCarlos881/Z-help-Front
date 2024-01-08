import { UserData } from "./user-data.interface";

export interface CreateActivity {
    latitud:      string;
    longitud:     string;
    accion:       boolean;
    usuarios:     UserData;
    id_actividad: number;
    activo:       boolean;
    created_at:   Date;
    updated_at:   Date;
}