export const generarId = () => {
    const random = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return random;
}

export const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return date.toLocaleDateString('es-ES', opciones);
};