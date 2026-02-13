// src/utils/formatters.ts

/**
 * Formatea un número o string como documento con puntos (11.222.333)
 */
export const formatDocument = (value: string | number | undefined): string => {
  if (!value) return ''
  // Quitamos cualquier cosa que no sea un número por seguridad
  const str = value.toString().replace(/\D/g, '')
  // Usamos el formateador de números de JS
  return new Intl.NumberFormat('es-AR').format(Number(str))
}

/**
 * Formatea una fecha de YYYY-MM-DD a DD-MM-YYYY
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  // Si los datos vienen de un objeto Date de JS, a veces traen hora, 
  // por eso el split con T o espacio es más seguro:
  const dayClean = day.split('T')[0].split(' ')[0]
  return `${dayClean}/${month}/${year}`
}