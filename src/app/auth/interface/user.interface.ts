import { Roles } from "../enum/index";

export interface User {
    id_usuario: number,
    nombre: string,
    numero_telefonico: string,
    foto: string,
    rol: Roles
}