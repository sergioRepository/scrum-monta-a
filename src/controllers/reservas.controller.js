import Reserva from '../models/reserva.js'
import twilio from 'twilio'
export const renderReservaForm = (req, res) =>
 res.render('reservas/new-reserva')

export const createNewReserva = async (req, res) => {
 const { fecha, alojamiento, especificaciones, telefono } = req.body
 const errors = []

 if (!fecha) {
  errors.push({ text: 'Please provide a date.' })
 }
 if (!alojamiento) {
  errors.push({ text: 'Please provide an accommodation.' })
 }
 if (!especificaciones) {
  errors.push({ text: 'Please provide specifications.' })
 }

 if (errors.length > 0) {
  return res.render('reservas/new-reserva', {
   errors,
   fecha,
   alojamiento,
   especificaciones,
   telefono,
  })
 }

 const newReserva = new Reserva({
  fecha,
  alojamiento,
  especificaciones,
  telefono,
 })
 newReserva.user = req.user.id
 const NumberoEnvio = newReserva.telefono
 const alojamientoreserva = newReserva.alojamiento
 const fechareserva = newReserva.fecha
 // Replace 'your_account_sid', 'your_auth_token', and 'your_twilio_number' with your actual values
 const accountSid = 'AC02f2b11a0be0f57cbd79c62bf121f907'
 const authToken = 'e407a28310f170ca5f4ec0f40bdcd0f4'
 const twilioNumber = '15854818627'

 // Create a Twilio client
 const client = twilio(accountSid, authToken)

 // Send a message
 client.messages
  .create({
   body: `centro recreacional la montaña! haz reservado : ${alojamientoreserva} para el dia ${fechareserva}`,
   from: twilioNumber,
   to: NumberoEnvio,
  })
  .then((message) => console.log('Message sent:', message.sid))
  .catch((error) => console.error('Error sending message:', error))
 await newReserva.save()
 req.flash('success_msg', 'Reserva Added Successfully')
 res.redirect('/reservas')
}

export const renderReservas = async (req, res) => {
 const reservas = await Reserva.find({ user: req.user.id })
  .sort({ fecha: 'desc' })
  .lean()
 res.render('reservas/all-reservas', { reservas })
}
export const rendercalendariouser = async (req, res) => {
 const reservas = await Reserva.find({ user: req.user.id })
  .sort({ fecha: 'desc' })
  .lean()
 res.render('reservas/calendario-user', { reservas })
}
export const renderAdmin = async (req, res) => {
 const reservas = await Reserva.find().sort({ createdAt: 'desc' }).lean()
 res.render('reservas/admin_reservas', { reservas })
}
export const renderCalendario = async (req, res) => {
 const reservas = await Reserva.find().sort({ createdAt: 'desc' }).lean()
 res.render('reservas/calendario-reservas', { reservas })
}

export const renderEditReservaForm = async (req, res) => {
 const reserva = await Reserva.findById(req.params.id).lean()
 if (reserva.user != req.user.id) {
  req.flash('error_msg', 'Not Authorized')
  return res.redirect('/reservas')
 }
 res.render('reservas/edit-reserva', { reserva })
}

export const updateReserva = async (req, res) => {
 const { fecha, alojamiento, especificaciones } = req.body
 await Reserva.findByIdAndUpdate(req.params.id, {
  fecha,
  alojamiento,
  especificaciones,
 })
 req.flash('success_msg', 'Reserva Updated Successfully')
 res.redirect('/reservas')
}

export const deleteReserva = async (req, res) => {
 await Reserva.findByIdAndDelete(req.params.id)
 req.flash('success_msg', 'Reserva Deleted Successfully')
 res.redirect('/reservas')
}

// Puedes agregar más funciones según tus necesidades
