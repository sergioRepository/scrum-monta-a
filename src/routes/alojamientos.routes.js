import { Router } from 'express'
import {
 renderAlojamientoForm,
 createNewAlojamiento,
 renderAlojamientos,
 renderEditAlojamientoForm,
 updateAlojamiento,
 deleteAlojamiento,
} from '../controllers/alojamientos.controllers.js'

const router = Router()

// Nuevo Alojamiento
router.get('/alojamientos/add', renderAlojamientoForm)
router.post('/alojamientos/new-alojamiento', createNewAlojamiento)

// Obtener Todos los Alojamientos
router.get('/alojamientos', renderAlojamientos)

// Editar Alojamientos
router.get('/alojamientos/edit/:id', renderEditAlojamientoForm)
router.put('/alojamientos/edit-alojamiento/:id', updateAlojamiento)

// Eliminar Alojamientos
router.delete('/alojamientos/delete/:id', deleteAlojamiento)

export default router
