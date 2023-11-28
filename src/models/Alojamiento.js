import mongoose from 'mongoose'

const AlojamientoSchema = new mongoose.Schema(
 {
  nombre: {
   type: String,
   required: true,
  },
  tipo: {
   type: String,
   required: true,
  },
  descripcion: {
   type: String,
   required: true,
  },
  precio: {
   type: Number,
   required: true,
  },
 },
 {
  timestamps: true,
 }
)

export default mongoose.model('Alojamiento', AlojamientoSchema)
