
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

    // Función para calcular el pago mensual del préstamo
    function calcularPagoMensual(monto, tasaInteresAnual, meses) {
        const porcentaje = tasaInteresAnual * 0.01;
        const porcentajeSacado = (monto * porcentaje) + monto;
        const tasaInteresMensual = porcentajeSacado / meses;
        return tasaInteresMensual;
    }

    // Función para manejar el evento de envío del formulario
    function manejarEnvioFormulario(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const monto = parseFloat(document.getElementById('monto').value);
        const tasaInteresAnual = parseFloat(document.getElementById('tasaInteresAnual').value);
        const meses = parseFloat(document.getElementById('meses').value);

        // Validar las entradas
        if (isNaN(monto) || monto <= 0 || isNaN(tasaInteresAnual) || tasaInteresAnual <= 0 || isNaN(meses) || meses <= 0) {
            document.getElementById('resultado').innerText = 'Por favor, ingresa valores válidos mayores que cero.';
            return;
        }

        // Calcular el pago mensual
        const pagoMensual = calcularPagoMensual(monto, tasaInteresAnual, meses);
        const totalConIntereses = pagoMensual * meses;

        // Crear un objeto de préstamo y agregarlo al array
        const prestamo = {
            monto: monto,
            tasaInteresAnual: tasaInteresAnual,
            meses: meses,
            pagoMensual: pagoMensual.toFixed(2),
            totalConIntereses: totalConIntereses.toFixed(2)
        };
        agregarPrestamo(prestamo);

        // Mostrar el resultado
        document.getElementById('resultado').innerText = 'El pago mensual del préstamo es: $' + pagoMensual.toFixed(2) + 
                                                        '. El total del préstamo con intereses es: $' + totalConIntereses.toFixed(2);

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

    // Función para actualizar la fecha y la hora
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




//carro
// Lista de productos disponibles
const productos = [
    { id: 1, nombre: "Producto 1", precio: 100 },
    { id: 2, nombre: "Producto 2", precio: 200 },
    { id: 3, nombre: "Producto 3", precio: 300 }
];

// Carrito de compras (inicialmente vacío o cargado desde localStorage)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Referencias a elementos del DOM
const contenedorProductos = document.getElementById('productos');
const contenedorCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');

// Función para renderizar productos
function mostrarProductos() {
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
        contenedorProductos.appendChild(divProducto);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(prod => prod.id === productId);
    const productoEnCarrito = carrito.find(prod => prod.id === productId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
}

// Función para actualizar el carrito de compras
function actualizarCarrito() {
    // Limpiar carrito
    contenedorCarrito.innerHTML = '';

    // Mostrar productos en el carrito
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.classList.add('producto-carrito');
        li.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <input type="number" value="${producto.cantidad}" min="1" onchange="cambiarCantidad(${index}, this.value)">
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(li);
    });

    // Calcular y mostrar el total
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalElemento.textContent = total;
}

// Función para cambiar la cantidad de productos en el carrito
function cambiarCantidad(index, nuevaCantidad) {
    carrito[index].cantidad = parseInt(nuevaCantidad);
    actualizarCarrito();
    guardarCarrito();
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarrito();
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Inicializar la visualización de productos y carrito
mostrarProductos();
actualizarCarrito();





