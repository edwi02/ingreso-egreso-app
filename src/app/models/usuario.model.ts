export class Usuario {

    static fromFirebase( { uid, email, nombre } ): any {
        return new Usuario( uid, email, nombre);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ) {}
}