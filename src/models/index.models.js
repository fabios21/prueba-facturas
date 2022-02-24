const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacturasSchema = new Schema({
    codigoFactura: {
        type: String,
    },
    cliente: {
        type: String,
    },
    ciudad: {
        type: String,
    },
    nit: {
        type: String,
    },
    totalFactura: {
        type: String,
    },
    subTotal: {
        type: String,
    },
    iva: {
        type: String,
    },
    retencion: {
        type: String,
    },
    fechaDeCreacion: {
        type: String,
    },
    estado: {
        type: String,
    },
    pagada: {
        type: String,
    },
    fechaPago: {
        type: String,
    },
    email: {
        type: String,
    },
});

const Factura = mongoose.model('facturas',FacturasSchema);

module.exports = Factura;