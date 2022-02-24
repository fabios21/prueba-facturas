"use strict"

 var assert = require('assert');
 var request = require('supertest')
 var app = require('../index.js')

 var request = request("http://localhost:3000")

 describe('products', function() {
     describe('GET', function(){
         it('Should return json as default data format', function(done){
             request.get('/api/facturas')
                 .expect('Content-Type', /json/)
                 .expect(200, done);
         });
     });
 });

 