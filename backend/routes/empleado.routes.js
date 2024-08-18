/**
 * Vamos a crear rutas del servidor
 * creamos un m�dulo por eso utilizamos express
 * vamos a utilizar como nuestra rest api para 
 * enviar y recibir datos en formato json
 */
const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleado.controller');

/* generamos un ejemplo cuando le soliciten 
algo al servidor por el m�todo GET **/  
/*router.get('/', (req, res) => {  
                               
   res.json({
        status: 'API REST funcionando'
    });
})*/

router.get('/', empleadoCtrl.getEmpleados); // Aqui tenemos una ruta más limpia de entender gracias al controlador. obtiene todos los empleados
router.post('/', empleadoCtrl.createEmpleados);//guardar
router.get('/:id', empleadoCtrl.getUnicoEmpleado);// obtiene unn unico empleado
router.put('/:id',empleadoCtrl.editarEmpleado);   //Acctualizar datos (uno a la vez)
router.delete('/:id', empleadoCtrl.eliminarEmpleado);

module.exports = router;
