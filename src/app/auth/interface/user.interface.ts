import { Roles } from "../enum/index";

export interface User {
    id_usuario: number,
    numero_telefonico: string,
    foto: string,
    rol: Roles
}