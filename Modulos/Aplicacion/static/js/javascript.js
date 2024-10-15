let dataTable;
let dataTableInitialized = false;

const dataTableOptions = {
    pageLength: 4,
    destroy: true,
    language: {
        url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json',
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        search: "Buscar:",
    }
};

const initDataTable = async () => {
    if (dataTableInitialized) {
        dataTable.destroy();
    }

    dataTable = $(".table").DataTable(dataTableOptions);

    dataTableInitialized = true;
}

window.addEventListener("load", async () => {
    await initDataTable()
})

document.querySelector('.profile-container').addEventListener('click', function () {
    var profileOption = document.querySelector('.profile-option');
    if (profileOption.classList.contains('expand')) {
        profileOption.classList.remove('expand');
        profileOption.style.display = 'none';
    } else {
        profileOption.classList.add('expand');
        profileOption.style.display = 'flex';
    }
});

document.getElementById("txtTipoUsuario").onchange = function () {
    if (this.value === "Externo") {
        document.getElementById("interno").selected = true;
        document.getElementById("txtTipoPrestamo").disabled = true;
    }

    else {
        document.getElementById("interno").selected = false;
        document.getElementById("txtTipoPrestamo").disabled = false;
    }
};


document.addEventListener("DOMContentLoaded", function () {
    const nombre = document.querySelector(".txtNombrePres");
    const apellido = document.querySelector(".txtApellidoPres");
    const cedulaEstudiantes = document.querySelector(".cedulaEstudiantes");
    const cedulaAcademicos = document.querySelector(".cedulaAcademicos");
    const cedulaAdministrativos = document.querySelector(".cedulaAdministrativos");
    const cedulaExternos = document.querySelector(".cedulaExternos");
    const codigoLibro = document.querySelector(".codigolibro");
    const autor = document.querySelector(".txtAutorPres");
    const titulo = document.querySelector(".txtTituloPres");

     // Aquí va el nuevo código para los libros
     codigoLibro.addEventListener("change", function () {
        codigoLibro.setAttribute("name", "txtCodigolibro");
        let option = codigoLibro.options[codigoLibro.selectedIndex];
        autor.value = option.getAttribute("data-autor");
        titulo.value = option.getAttribute("data-titulo");
    });

    cedulaEstudiantes.addEventListener("change", function () {
        let option = cedulaEstudiantes.options[cedulaEstudiantes.selectedIndex];
        nombre.value = option.getAttribute("data-nombre");
        apellido.value = option.getAttribute("data-apellido");
    });

    cedulaAcademicos.addEventListener("change", function () {
        let option = cedulaAcademicos.options[cedulaAcademicos.selectedIndex];
        nombre.value = option.getAttribute("data-nombre");
        apellido.value = option.getAttribute("data-apellido");
    });

    cedulaAdministrativos.addEventListener("change", function () {
        let option = cedulaAdministrativos.options[cedulaAdministrativos.selectedIndex];
        nombre.value = option.getAttribute("data-nombre");
        apellido.value = option.getAttribute("data-apellido");
    });

    document.getElementById("txtTipoUsuario").onchange = function () {
        var previousElements = document.querySelectorAll(".select-active");
        previousElements.forEach(function (element) {
            element.classList.remove("select-active");
            element.setAttribute("name", "");
        });

        if (this.value === "Estudiante") {
            cedulaEstudiantes.classList.add("select-active");
            cedulaEstudiantes.setAttribute("name", "txtCedula");
        } else if (this.value === "Académico") {
            cedulaAcademicos.classList.add("select-active");
            cedulaAcademicos.setAttribute("name", "txtCedula");
        } else if (this.value === "Administrativo") {
            cedulaAdministrativos.classList.add("select-active");
            cedulaAdministrativos.setAttribute("name", "txtCedula");
        } else if (this.value === "Externo") {
            cedulaExternos.classList.add("select-active");
            cedulaExternos.setAttribute("name", "txtCedula");
        }
    };

    document.querySelector('.close').addEventListener('click', function () {
        this.parentNode.remove();
    });

    setTimeout(function () {
        document.querySelector('.error').classList.remove('error');
    }, 5000);


});
