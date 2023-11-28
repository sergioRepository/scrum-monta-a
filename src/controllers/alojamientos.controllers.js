import Alojamiento from '../models/Alojamiento.js'

export const renderAlojamientoForm = (req, res) =>
 res.render('alojamientos/new-alojamiento')

export const createNewAlojamiento = async (req, res) => {
 const { nombre, tipo, descripcion, precio } = req.body
 const errors = []

 if (!nombre) {
  errors.push({ text: 'Please provide a Name.' })
 }

 // Asegúrate de validar otros campos según tus necesidades

 if (errors.length > 0) {
  return res.render('alojamientos/new-alojamiento', {
   errors,
   nombre,
   tipo,
   descripcion,
   precio,
  })
 }

 const newAlojamiento = new Alojamiento({ nombre, tipo, descripcion, precio })
 await newAlojamiento.save()

 req.flash('success_msg', 'Alojamiento Added Successfully')
 res.redirect('/alojamientos')
}

export const renderAlojamientos = async (req, res) => {
 const alojamientos = await Alojamiento.find()
  .sort({ createdAt: 'desc' })
  .lean()
 res.render('alojamientos/all-alojamientos', { alojamientos })
}

export const renderEditAlojamientoForm = async (req, res) => {
 const alojamiento = await Alojamiento.findById(req.params.id).lean()

 res.render('alojamientos/edit-alojamiento', { alojamiento })
}

export const updateAlojamiento = async (req, res) => {
 const { nombre, tipo, descripcion, precio } = req.body

 await Alojamiento.findByIdAndUpdate(req.params.id, {
  nombre,
  tipo,
  descripcion,
  precio,
 })

 req.flash('success_msg', 'Alojamiento Updated Successfully')
 res.redirect('/alojamientos')
}

export const deleteAlojamiento = async (req, res) => {
 await Alojamiento.findByIdAndDelete(req.params.id)
 req.flash('success_msg', 'Alojamiento Deleted Successfully')
 res.redirect('/alojamientos')
}
