import mongoose from 'mongoose'

const ReservaSchema = new mongoose.Schema({
 fecha: {
  type: Date,
  required: true,
 },
 alojamiento: {
  type: String, // Referencia al modelo de Alojamiento
  required: true,
 },
 especificaciones: {
  type: String,
  required: true,
 },
 telefono: {
  type: String,
  required: true,
 },
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User', // Referencia al modelo de User
  required: true,
 },
})

const Reserva = mongoose.model('Reserva', ReservaSchema)

export default Reserva
