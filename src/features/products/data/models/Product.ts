export class Product {
    nombre: string
    precio: number
    codigo: string
    descuento: boolean

    constructor(nombre: string, precio: number, codigo: string, descuento: boolean) {
        this.nombre = nombre
        this.precio = precio
        this.codigo = codigo
        this.descuento = descuento
    }
}