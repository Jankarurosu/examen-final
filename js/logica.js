// Definición de la clase Libro
class Libro {
    // Constructor de la clase Libro
    constructor(titulo, autor, editorial, genero, año, precio) {
        this.titulo = titulo;
        this.autor = autor;
        this.editorial = editorial;
        this.genero = genero;
        this.año = año;
        this.precio = precio;
    }
}

// Definición de la clase Interfaz
class Interfaz {
    // Método para agregar un libro a la tabla
    agregarLibroTabla(libro) {
        const list = document.getElementById("listaLibros");
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.editorial}</td>
        <td>${libro.genero}</td>
        <td>${libro.año}</td>
        <td>S/. ${libro.precio}</td>
        <td>
        <!--<button class="btn btn-warning btn-sm btn-actualizar">Actualizar</button>-->
        <button class="btn btn-danger btn-sm btn-borrar">Borrar</button>
        </td>
        `;
        list.appendChild(fila);
    }

    // Método para mostrar una alerta en la interfaz
    mostrarAlerta(mensaje, claseNombre) {
        const div = document.createElement("div");
        div.className = `alert ${claseNombre}`;
        div.appendChild(document.createTextNode(mensaje));
        const contenedor = document.querySelector(".container");
        const formulario = document.querySelector(".mb-5");
        contenedor.insertBefore(div, formulario);
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    }

    // Método para eliminar un libro de la tabla
    eliminarLibroTabla(titulo) {
        const filas = document.querySelectorAll("#listaLibros tr");
        filas.forEach(function (fila) {
            if (fila.children[0].textContent === titulo) {
                fila.remove();
            }
        });
    }

    // Método para limpiar los campos del formulario
    limpiarCampos() {
        document.getElementById("inputTitulo").value = "";
        document.getElementById("inputAutor").value = "";
        document.getElementById("inputEditorial").value = "";
        document.getElementById("inputGenero").value = "";
        document.getElementById("inputAño").value = "";
        document.getElementById("inputPrecio").value = "";
    }
}

// Definición de la clase Almacenamiento
class Almacenamiento {
    // Método estático para obtener los libros guardados en el almacenamiento local
    static obtenerLibros() {
        let libros;
        if (localStorage.getItem("libros") == null) {
            libros = [];
        } else {
            libros = JSON.parse(localStorage.getItem("libros"));
        }
        return libros;
    }

    // Método estático para mostrar los libros en la tabla al cargar la página
    static mostrarLibros() {
        const libros = Almacenamiento.obtenerLibros();

        libros.forEach(function (libro) {
            const interfaz = new Interfaz();
            interfaz.agregarLibroTabla(libro);
        })
    }

    // Método estático para agregar un libro al almacenamiento local
    static agregarLibro(libro) {
        const libros = Almacenamiento.obtenerLibros();
        libros.push(libro);

        localStorage.setItem("libros", JSON.stringify(libros));
    }
}

// Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', Almacenamiento.mostrarLibros());

// Evento de click en el botón de agregar libro
document.getElementById('btnAgregar').addEventListener('click',
    function (e) {
        // Obtener los valores de los campos del formulario
        const titulo = document.getElementById('inputTitulo').value;
        const autor = document.getElementById('inputAutor').value;
        const editorial = document.getElementById('inputEditorial').value;
        const genero = document.getElementById('inputGenero').value;
        const año = document.getElementById('inputAño').value;
        const precio = document.getElementById('inputPrecio').value;

        // Crear un nuevo objeto Libro con los valores obtenidos
        const libro = new Libro(titulo, autor, editorial, genero, año, precio);
        const interfaz = new Interfaz();

        // Validar si los campos están vacíos
        if (titulo === '' || autor === '' || editorial === '' || genero === '' || año === '' || precio === '') {
            // Mostrar una alerta de error si hay campos vacíos
            interfaz.mostrarAlerta('Por favor completa todos los campos', 'error');
        } else {
            // Agregar el libro a la tabla
            interfaz.agregarLibroTabla(libro);
            // Mostrar una alerta de éxito
            interfaz.mostrarAlerta('Libro agregado', 'success');
            // Agregar el libro al almacenamiento local
            Almacenamiento.agregarLibro(libro);
            // Limpiar los campos del formulario
            interfaz.limpiarCampos();
        }

        // Evitar que se recargue la página
        e.preventDefault();
    });

// Evento de click en la tabla de libros
document.getElementById('listaLibros').addEventListener('click', function (e) {
    const interfaz = new Interfaz();

    // Si se hace click en el botón de actualizar
    if (e.target.classList.contains('btn-actualizar')) {
        const fila = e.target.parentElement.parentElement;
        const titulo = fila.children[0].textContent;
        const autor = fila.children[1].textContent;
        const editorial = fila.children[2].textContent;
        const genero = fila.children[3].textContent;
        const año = fila.children[4].textContent;
        const precio = fila.children[5].textContent;

        // Llamar a la función de actualizar datos
        updateData(titulo, autor, editorial, genero, año, precio);
    }
    // Si se hace click en el botón de borrar
    if (e.target.classList.contains('btn-borrar')) {
        const fila = e.target.parentElement.parentElement;
        const titulo = fila.children[0].textContent;

        // Llamar a la función de eliminar datos
        deleteData(titulo);
    }
});

// Función para eliminar un libro del almacenamiento local y de la tabla
function deleteData(titulo) {
    var libros;
    if (localStorage.getItem('libros') === null) {
        libros = [];
    } else {
        libros = JSON.parse(localStorage.getItem("libros"));
    }

    libros.forEach(function (libro, index) {
        if (libro.titulo === titulo) {
            libros.splice(index, 1);
        }
    });

    localStorage.setItem('libros', JSON.stringify(libros));
    const interfaz = new Interfaz();
    interfaz.mostrarAlerta('Libro eliminado', 'success');
    interfaz.eliminarLibroTabla(titulo);
}

/* Función para actualizar los datos de un libro
function updateData(titulo, autor, editorial, genero, año, precio) {
    console.log('Actualizar libro', titulo, autor, editorial, genero, año, precio);
}*/