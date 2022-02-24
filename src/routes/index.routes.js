const express = require('express');
const router = express.Router();
const Factura = require('../models/index.models');
const nodemailer = require('nodemailer');

router.get('/facturas',function(req,res,next){
    Factura.find({}).then(function(facturas){
        res.send(facturas);
    }).catch(next);
});

router.post('/facturas',function(req,res,next){
    Factura.create(req.body).then(function(factura){
        res.send(factura);
    }).catch(next);
});

router.post('/facturas/:id',function(req,res,next){
    Factura.findOneAndUpdate({_id: req.params.id},req.body).then(function(factura){
        factura.estado === "Primer recordatorio" ? factura.estado = "Segundo recordatorio" :
        factura.estado = "Desactivado"
        Factura.create(factura).then(function(factura){
            res.send(factura);
        }).catch(next);
    });
});

router.post('/email/:email/:estado/:cliente', async function (req, res){
    try {
        let nuevoEstado = req.params.estado === "Primer recordatorio" ? "Segundo recordatorio" : "Desactivado"

        contentHTML = `
        <h3>Cambio de estado</h3>
        
        <p>Hola ${req.params.cliente}, queremos informarle que su estado ha cambiado de <strong>"${req.params.estado}"</strong> a <strong>"${nuevoEstado}"</strong>.</p>
        `;
    
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'pruebafullstackmonolegal@gmail.com',
                pass: 'mpjueuwsdrshbjjj'
            },
            tls: {
                rejectUnauthorized: true
            }
        });
    
        let info = await transporter.sendMail({
            from: '"Notificación MONOLEGAL" <pruebafullstackmonolegal@gmail.com>', // sender address,
            to: `${req.params.email}`,
            subject: 'Cambio de estado',
            html: contentHTML
        })
    
        console.log('Message sent: %s', info);
        
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    catch (error) {
        console.log(error)
    }
});

router.delete('/facturas/:id',function(req,res,next){
    Factura.findOneAndDelete({_id: req.params.id}).then(function(factura){
        res.send(factura);
    });   
});


module.exports = router;