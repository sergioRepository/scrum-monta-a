import { Router } from 'express'
import {
 renderReservaForm,
 createNewReserva,
 renderReservas,
 renderEditReservaForm,
 updateReserva,
 deleteReserva,
 renderAdmin,
 renderCalendario,
 rendercalendariouser,
} from '../controllers/reservas.controller.js'
import { isAuthenticated } from '../helpers/auth.js'

const router = Router()

// Nueva Reserva
router.get('/reservas/add', isAuthenticated, renderReservaForm)

router.post('/reservas/new-reserva', isAuthenticated, createNewReserva)

// Obtener todas las Reservas
router.get('/reservas/', isAuthenticated, renderReservas)

router.get('/reservas/calendario-user', isAuthenticated, rendercalendariouser)

router.get('/reservas/admin_reservas', isAuthenticated, renderAdmin)

router.get('/reservas/calendario-reservas', isAuthenticated, renderCalendario)

// Editar Reservas
router.get('/reservas/edit/:id', isAuthenticated, renderEditReservaForm)

router.put('/reservas/edit-reserva/:id', isAuthenticated, updateReserva)

// Eliminar Reservas
router.delete('/reservas/delete/:id', isAuthenticated, deleteReserva)

export default router
