const { Router } = require('express')
const router = Router()


// importo archivo
const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNote } = require('../controllers_funciones/notes.controller');

const {isAuthenticated} = require('../validacionrutas/validacion');

// Nuevas notas, si esta autenticado ccontinua navegando, sino va al login por el "isAuthenticated"
router.get('/notes/add', isAuthenticated, renderNoteForm);

// cuando el formulario manda los datos, llega a esta ruta( no hay conflicto a pesar de tener el mismo nombre porque una funciona con get y otra con post)
router.post('/notes/new-note', isAuthenticated, createNewNote);

// Obtener todas las notas
router.get('/notes', isAuthenticated, renderNotes);

// Editar notas - esta primer ruta es para mostrar el formulario, aca no solo crea, sino tambien actualiza datos
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

// esta ruta es para actualizar los datos, por eso put en lugar de post
router.put('/notes/edit/:id', isAuthenticated, updateNote);

// Deletear Notas
router.delete('/notes/delete/:id', deleteNote);


module.exports = router
