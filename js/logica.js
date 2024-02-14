class Libro {
    constructor(titulo, autor, editorial, genero, año, precio) {
        this.titulo = titulo;
        this.autor = autor;
        this.editorial = editorial;
        this.genero = genero;
        this.año = año;
        this.precio = precio;
    }
}

class Interfaz {
    agregarLibroTabla(libro) {
        const list = document.getElementById("listaLibros");
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.editor}</td>
        <td>${libro.genero}</td>
        <td>${libro.año}</td>
        <td>${libro.precio}</td>
        <td>
        <button class="btn btn-warning btn-sm btn-actualizar">Actualizar</button>
        <button class="btn btn-danger btn-sm btn-borrar">Borrar</button>
        </td>
        `;
        list.appendChild(fila);
    }

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

    eliminarLibroTabla(titulo) {
        const filas = document.querySelectorAll("#listaLibros tr");
        filas.forEach(function (fila) {
            if (fila.children[0].textContent === titulo) {
                fila.remove();
            }
        });
    }

    limpiarCampos() {
        document.getElementById("inputTitulo").value = "";
        document.getElementById("inputAutor").value = "";
        document.getElementById("inputEditorial").value = "";
        document.getElementById("inputGenero").value = "";
        document.getElementById("inputAño").value = "";
        document.getElementById("inputPrecio").value = "";
    }
}

class Almacenamiento {
    static obtenerLibros() {
        let libros;
        if (localStorage.getItem("libros") == null) {
            libros = [];
        } else {
            libros = JSON.parse(localStorage.getItem("libros"));
        }
        return libros;
    }

    static mostrarLibros() {
        const libros = Almacenamiento.obtenerLibros();

        libros.forEach(function (libro) {
            const interfaz = new Interfaz();
            interfaz.agregarLibroTabla(libro);
        })
    }

    static agregarLibro(libro) {
        const libros = Almacenamiento.obtenerLibros();
        libros.push(libro);

        localStorage.setItem("libros", JSON.stringify(libros));
    }
}

document.addEventListener('DOMContentLoaded', Almacenamiento.mostrarLibros());

document.getElementById('btnAgregar').addEventListener('click',
    function (e) {
        const titulo = document.getElementById('inputTitulo').value;
        const autor = document.getElementById('inputAutor').value;
        const editorial = document.getElementById('inputEditorial').value;
        const genero = document.getElementById('inputGenero').value;
        const año = document.getElementById('inputAño').value;
        const precio = document.getElementById('inputPrecio').value;

        const libro = new Libro(titulo, autor, editorial, genero, año, precio);
        const interfaz = new Interfaz();

        if (titulo === '' || autor === '' || editorial === '' || genero === '' || año === '' || precio === '') {

            interfaz.mostrarAlerta('Por favor completa todos los campos', 'error');
        } else {

            interfaz.agregarLibroTabla(libro);

            interfaz.mostrarAlerta('Libro agregado', 'success');

            Almacenamiento.agregarLibro(libro);

            interfaz.limpiarCampos();
        }

        e.preventDefault();
    });

document.getElementById('listaLibros').addEventListener('click', function (e) {
    const interfaz = new Interfaz();

    if (e.target.classList.contains('btn-actualizar')) {
        const fila = e.target.parentElement.parentElement;
        const titulo = fila.children[0].textContent;
        const autor = fila.children[1].textContent;
        const editorial = fila.children[2].textContent;
        const genero = fila.children[3].textContent;
        const año = fila.children[4].textContent;
        const precio = fila.children[5].textContent;

        updateData(titulo, autor, editorial, genero, año, precio);
    }
    if (e.target.classList.contains('btn-borrar')) {
        const fila = e.target.parentElement.parentElement;
        const titulo = fila.children[0].textContent;

        deleteData(titulo);
    }
});

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

function updateData(titulo, autor, editorial, genero, año, precio) {
    console.log('Actualizar libro', titulo, autor, editorial, genero, año, precio);
}
