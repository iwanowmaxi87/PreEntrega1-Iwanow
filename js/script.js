document.addEventListener('DOMContentLoaded', function() {
    // Array para almacenar préstamos simulados
    const prestamos = [];

    // Función para agregar un préstamo al array
    function agregarPrestamo(prestamo) {
        prestamos.push(prestamo);
    }

    // Función para buscar préstamos por monto
    function buscarPrestamoPorMonto(monto) {
        return prestamos.filter(prestamo => prestamo.monto === monto);
    }

    // Función para calcular el pago mensual
    function calcularPagoMensual(monto, tasaInteresAnual, meses) {
        const tasaInteresMensual = tasaInteresAnual / 12 / 100;
        const pagoMensual = (monto * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -meses));
        return pagoMensual;
    }

    // Función para manejar el evento de envío del formulario
    function manejarEnvioFormulario(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const monto = parseFloat(document.getElementById('monto').value);
        const tasaInteresAnual = parseFloat(document.getElementById('tasaInteresAnual').value);
        const meses = parseFloat(document.getElementById('meses').value);

        // Valida las entradas
        if (isNaN(monto) || monto <= 0 || isNaN(tasaInteresAnual) || tasaInteresAnual <= 0 || isNaN(meses) || meses <= 0) {
            document.getElementById('resultado').innerText = 'Por favor, ingresa valores válidos mayores que cero.';
            return;
        }

        // Calcula el pago mensual
        const pagoMensual = calcularPagoMensual(monto, tasaInteresAnual, meses);
        const totalConIntereses = pagoMensual * meses;

        // Crear un préstamo y agregarlo al array
        const prestamo = {
            monto: monto,
            tasaInteresAnual: tasaInteresAnual,
            meses: meses,
            pagoMensual: pagoMensual.toFixed(2),
            totalConIntereses: totalConIntereses.toFixed(2)
        };
        agregarPrestamo(prestamo);

        // Mostrar el resultado
        document.getElementById('resultado').innerText = 'El pago mensual del préstamo es: $' + pagoMensual.toFixed(2) ;

        // Mostrar todos los préstamos almacenados en la página
        mostrarPrestamos();
    }

    // Función para mostrar todos los préstamos almacenados
    function mostrarPrestamos() {
        const prestamosListados = document.getElementById('prestamosListados');
        prestamosListados.innerHTML = '<h2>Préstamos Simulados</h2>';
        prestamos.forEach(prestamo => {
            const prestamoElemento = document.createElement('div');
            prestamoElemento.innerText = `Monto: $${prestamo.monto}, Tasa de Interés Anual: ${prestamo.tasaInteresAnual}%, Meses: ${prestamo.meses}, Pago Mensual: $${prestamo.pagoMensual}, Total con Intereses: $${prestamo.totalConIntereses}`;
            prestamosListados.appendChild(prestamoElemento);
        });
    }

    // Función para la fecha y la hora
    function actualizarFechaHora() {
        const fechaHoraElement = document.getElementById('fechaHora');
        const now = new Date();
        const fecha = now.toLocaleDateString();
        const hora = now.toLocaleTimeString();
        fechaHoraElement.innerText = `Fecha: ${fecha} - Hora: ${hora}`;
    }

    // Actualizar la fecha y la hora cada segundo
    setInterval(actualizarFechaHora, 1000);

    // Agregar el evento de envío del formulario
    document.getElementById('formPrestamo').addEventListener('submit', manejarEnvioFormulario);
});