export class ProductDTO {
    id: number
    nombre: string
    precio: number
    codigo: string
    descuento: boolean
    fecha_creacion?: string

    constructor(
        id: number,
        nombre: string,
        precio: number,
        codigo: string,
        descuento: boolean,
        fecha_creacion?: string
    ) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.codigo = codigo
        this.descuento = descuento
        this.fecha_creacion = fecha_creacion
    }
}