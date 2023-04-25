let personas = [];
let companies = [];

/**
 * Método que carga los usuraios x,y,z con sus respectivas contraseñas
 */
function onLoad() {

    localStorage.setItem("x", "x");
    localStorage.setItem("y", "y");
    localStorage.setItem("z", "z");

    mostrarElementos();
    addListenerOptions();

}

/**
 * Crea los enlaces de todos los elementos de la tabla principal
 */
function addListenerOptions() {

    const TABLE = document.getElementById("mainTable");

    for (let elemento of TABLE.getElementsByTagName("img")) {

        elemento.setAttribute("onclick", "pagina(this)");
    }

    for (let elemento of TABLE.getElementsByTagName("a")) {

        elemento.setAttribute("onclick", "pagina(this)");
    }
}

/**
 * Crea la página que se muestra cuándo un usuario hace click en la tabla
 * @param {HTMLObject} imagen  Objeto HTML que puede ser la imagen o el texto dependiendo de donde a clickado el usuario
 */
function pagina(imagen) {

    if (imagen.tagName == 'A') { imagen = imagen.previousElementSibling; }

    let lista;
    switch (imagen.getAttribute('columna')) {

        case '0':
            lista = "listaProductos";
            break;

        case '1':
            lista = "listaPersonas";
            break;

        case '2':
            lista = "listaCompany";
            break;
    }

    const OBJECT = JSON.parse(localStorage.getItem(lista))[imagen.getAttribute("idLista")];

    let page = `
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <title>Anales de la Ciencia - ${OBJECT["nombre"]}</title>
        <meta charset="UTF-8">
        <meta name="author" content="&Aacute;lvaro Alonso Devesa">
        <meta name="keywords" content="Anales de la Ciencia, ${OBJECT["nombre"]}">
        <link rel="stylesheet" type="text/css" href="style.css">
        <script language="JavaScript" src="logic.js"></script>
    </head>

    <body>
        <header>
            <h1>Anales de la Ciencia</h1>
        </header>
        <nav>
            <a href="index.html" title="index">INICIO</a>
        </nav>
        <main>
            <section>
                <h2>${OBJECT["nombre"]}</h2>
                <article>
                    <p>
                        ${OBJECT["fechaNac"]}
                        <br>
                        ${OBJECT["fechaDef"]}
                    </p>
                </article>
                <nav>
                    <img class="mainImage" src="${OBJECT["imagePath"]}" alt="${OBJECT["nombre"]}">
                </nav>
            </section>
            <section>
                <iframe src="${OBJECT["WikiPage"]}" name="${OBJECT["nombre"]}Frame"></iframe>
            </section>
        </main>
        <footer>`;

    (OBJECT["creadores"] ?? []).forEach(creador => {

        const PERSONAS = JSON.parse(localStorage.getItem("listaPersonas"));

        let i = 0;
        encontrado = false;

        while (!encontrado && i < PERSONAS.length) {

            if (PERSONAS[i]["nombre"] == creador) {
                encontrado = true;
                page += `<img class="rightimages" src="${PERSONAS[i]["imagePath"]}" idLista=${i} columna="1" onclick="pagina(this)">`;
            }

            i++;
        }
    });

    (OBJECT["empresas"] ?? []).forEach(empresa => {

        const COMPANY = JSON.parse(localStorage.getItem("listaCompany"));

        let i = 0;
        encontrado = false;

        while (!encontrado && i < COMPANY.length) {

            if (COMPANY[i]["nombre"] == empresa) {

                encontrado = true;
                page += `<img class="leftimages" src="${COMPANY[i]["imagePath"]}" idLista=${i} columna="2" onclick="pagina(this)">`;
            }

            i++;
        }
    });

    page += '</footer></body></html>';

    const VENTANA = window.open(OBJECT["nombre"]);
    VENTANA.document.write(page);

}

/**
 * Crea las opciones para añadir, borrar y modificar elementos de la tabla
 */
function addWriterOptions() {

    const TABLE = document.getElementById("mainTable");

    for (let elemento of TABLE.getElementsByTagName("td")) {

        if (elemento.firstChild) {

            elemento.innerHTML += "<input type=\"button\" name=\"edit\" value=\"edit\" onclick=\"editItem(this)\">";
            elemento.innerHTML += "<input type=\"button\" name=\"delete\" value=\"delete\" onclick=\" deleteItem(this)\">";
        }
    }

    const NEWROW = document.createElement("tr");
    TABLE.appendChild(NEWROW);

    NEWROW.innerHTML += "<td><form><input id=\"botonNuevoProducto\" type=\"button\" name=\"nuevo producto\" value=\"nuevo producto\" onclick=\"newFormProduct()\"></form></td>"
    NEWROW.innerHTML += "<td><form><input id=\"botonNuevaPersona\" type=\"button\" name=\"nueva persona\" value=\"nueva persona\" onclick=\"newFormPerson()\"></form></td>"
    NEWROW.innerHTML += "<td><form><input id=\"botonNuevaEmpresa\" type=\"button\" name=\"nuevo entidad\" value=\"nueva entidad\" onclick=\"newFormCompany()\"></form></td>"

    const MAINSTRUCTURE = document.getElementById("mainStructure");
    const FORM = document.createElement("form");
    FORM.setAttribute("id", "newItemForm");
    MAINSTRUCTURE.appendChild(FORM);

}

/**
 * Muestra la tabla de elemtos
 */
function mostrarElementos() {

    const ARRAYPRODUCTOS = JSON.parse(localStorage.getItem("listaProductos")) ?? [];
    const ARRAYPEOPLE = JSON.parse(localStorage.getItem("listaPersonas")) ?? [];
    const ARRAYCOMPANIES = JSON.parse(localStorage.getItem("listaCompany")) ?? [];
    const TABLE = document.getElementById("mainTable");

    TABLE.innerHTML = "";

    for (let i = 0; i < Math.max(ARRAYPRODUCTOS.length, ARRAYPEOPLE.length, ARRAYCOMPANIES.length); i++) {

        const NEWROW = document.createElement("tr");
        TABLE.appendChild(NEWROW);

        [ARRAYPRODUCTOS, ARRAYPEOPLE, ARRAYCOMPANIES].forEach((element, index) => {

            const OBJECT = element[i];

            if (OBJECT) {

                let newElement = document.createElement("td");
                NEWROW.appendChild(newElement);
                newElement.innerHTML = `<img src="${OBJECT['imagePath']}" name="${OBJECT['nombre']}" idLista="${i}" columna="${index}"><a>${OBJECT['nombre']}</a>`;

            } else { NEWROW.innerHTML += "<td></>"; }
        });
    }
}

/**
 * Crea el formulario teniendo en cuenta el id
 * @param {HTMLObject} element Botón que se ha pulsado
 */
function editItem(element) {
    const IMAGEN = element.parentElement.firstChild;

    switch (IMAGEN.getAttribute("columna")) {

        case '0':
            newFormProduct(IMAGEN.getAttribute("idLista"));
            break;

        case '1':
            newFormPerson(IMAGEN.getAttribute("idLista"));
            break;

        case '2':
            newFormCompany(IMAGEN.getAttribute("idLista"));
            break;
    }
}
/**
 * Elimina de la tabla y de la memoria un elemento
 * @param {HTMLObject} element Botón que se ha pulsado
 */
function deleteItem(element) {

    let lista;

    switch (element.parentElement.getElementsByTagName("img")[0].getAttribute('columna')) {

        case '0':
            lista = "listaProductos";
            break;

        case '1':
            lista = "listaPersonas";
            break;

        case '2':
            lista = "listaCompany";
            break;
    }

    const ARRAY = JSON.parse(localStorage.getItem(lista));

    ARRAY.splice(element.parentElement.getElementsByTagName("img")[0].getAttribute('idLista'), 1);

    localStorage.setItem(lista, JSON.stringify(ARRAY));
    element.parentElement.innerHTML = "<td></td>";

}

/**
 * Funcion que se ejecuta cunado pulsa el botón de login
 */
function onLoging() {

    if (localStorage.getItem(document.getElementById("user_form").value) == document.getElementById("password_form").value) {

        const FORMULARIO = document.getElementById("logging_form");
        FORMULARIO.innerHTML = "<input type=\"submit\" name=\"logout\" value=\"logout\">";

        addWriterOptions();
    }
}

/**
 * Crea el formulario común, tanto para editar como para modificar
 * 
 * @param {String} name Nombre del producto a modificar en caso de que tenga, si no tiene es "" por defecto.
 * @param {Date} bornDate Fecha de nacimiento del producto a modificar en caso de que tenga, si no tiene es "" por defecto.
 * @param {Date} deathDate Fecha de fallecimiento del producto a modificar en caso de que tenga, si no tiene es "" por defecto.
 * @param {Date} wikiPage Página de la wikipedia del producto a modificar en caso de que tenga, si no tiene es "" por defecto.
 * @param {String} imagen Camino o enlace a la página del producto a modificar en caso de que tenga, si no tiene es "" por defecto.
 * 
 */
function newForm(name = "", bornDate = "", deathDate = "", wikiPage = "", imagen = "") {

    const FORM = document.getElementById("newItemForm");

    FORM.innerHTML = `<label for="Name">Nombre: </label><input id="Name" value="${name}" type="text" name="Name"/> <br>`;
    FORM.innerHTML += `<label for="BornDate">Año de nacimiento: </label><input id="BornDate" value="${bornDate}" type="date" name="BornDate"/><br>`;
    FORM.innerHTML += `<label for="DeathDate">Año de defunci&oacute;n: </label><input id="DeathDate" value="${deathDate}" type="date" name="DeathDate"/><br>`;
    FORM.innerHTML += `<label for="WikiPage">P&aacute;gina de la Wikipedia: </label><input id="WikiPage" value="${wikiPage}" type="text" name="WikiPage"/><br>`;
    FORM.innerHTML += `<label for="ImagePath">Nombre Absoluto de la im&aacutegen o enlace web a una im&aacutegen: </label><input value="${imagen}" id="ImagePath" type="text" name="ImagePath"/>`;

}

/**
 * Crea el formulario específico para la persona
 * 
 * @param {int} id En caso de que sea -1 (o no tenga ningún valor), el programa crea una nueva persona, en caso contrario la modifica.
 */
function newFormPerson(id = -1) {

    if (id != -1) {
        const PERSONA = JSON.parse(localStorage.getItem("listaPersonas"))[id];
        newForm(PERSONA["nombre"], PERSONA["fechaNac"], PERSONA["fechaDef"], PERSONA["WikiPage"], PERSONA["imagePath"]);
    } else { newForm(); }

    document.getElementById("newItemForm").innerHTML += `<br><br><input type="button" name="Crear Persona" value="Guardar Persona" onclick="newPerson(${id})">`;

}

/** 
 * Crea el formulario específico para la compañia
 * 
 * @param {int} id En caso de que sea -1 (o no tenga ningún valor), el programa crea una nueva compañia, en caso contrario la modifica.
 */
function newFormCompany(id = -1) {

    const FORM = document.getElementById("newItemForm");

    if (id != -1) {
        const COMPANY = JSON.parse(localStorage.getItem("listaCompany"))[id];
        newForm(COMPANY["nombre"], COMPANY["fechaNac"], COMPANY["fechaDef"], COMPANY["WikiPage"], COMPANY["imagePath"]);
        personas = COMPANY["creadores"];
    } else { newForm(); }

    FORM.innerHTML += "<br><label for=\"Addpersonas\">Nombre y Apellidos de la persona: </label><input id=\"Addpersonas\" type=\"text\" name=\"Addpersonas\"/>";
    FORM.innerHTML += "<input type=\"button\" name=\"Add personas\" value=\"Añadir\" onclick=\"addToList(0)\"><br><ul></ul><br>";
    FORM.innerHTML += `<input type="button" name="crear Compañia" value="Guardar Compañia" onclick="newCompany(${id})">`;

    if (id != -1) {
        arrayToList(0);
    }
}

/**
 * Crea el formulario específico para el producto
 * 
 * @param {int} id En caso de que sea -1 (o no tenga ningún valor), el programa crea un nuevo producto, en caso contrario la modifica.
 */
function newFormProduct(id = -1) {

    if (id != -1) {
        const PRODUCT = JSON.parse(localStorage.getItem("listaProductos"))[id];
        newForm(PRODUCT["nombre"], PRODUCT["fechaNac"], PRODUCT["fechaDef"], PRODUCT["WikiPage"], PRODUCT["imagePath"]);
        personas = PRODUCT["creadores"];
        companies = PRODUCT["empresas"];

    } else { newForm(); }

    const FORM = document.getElementById("newItemForm");

    FORM.innerHTML += "<br><label for=\"Addpersonas\">Nombre y Apellidos de la persona: </label><input id=\"Addpersonas\" type=\"text\" name=\"Addpersonas\"/>";
    FORM.innerHTML += "<input type=\"button\" name=\"Add personas\" value=\"Añadir\" onclick=\"addToList(0)\"><br><ul></ul><br>";

    FORM.innerHTML += "<br><label for=\"AddCompany\">Nombre de la compañia: </label><input id=\"AddCompany\" type=\"text\" name=\"AddCompany\"/>";
    FORM.innerHTML += "<input type=\"button\" name=\"Add Compañia\" value=\"Añadir\" onclick=\"addToList(1)\"><br> <ul></ul><br>";

    FORM.innerHTML += `<input type="button" name="crear Producto" value="Guradar Producto" onclick="newProduct(${id})">`;

    if (id != -1) {
        arrayToList(0);
        arrayToList(1);
    }

}

/**
 * Guarda la persona en local Storage
 * 
 * @param {int} id En caso de que sea -1 (o no tenga ningún valor), el programa crea una nueva persona, en caso contrario la modifica.
 */
function newPerson(id = -1) {

    const PERSONA = {
        nombre: document.getElementById("Name").value,
        fechaNac: document.getElementById("BornDate").value,
        fechaDef: document.getElementById("DeathDate").value,
        imagePath: document.getElementById("ImagePath").value,
        WikiPage: document.getElementById("WikiPage").value,
    };

    document.getElementById("newItemForm").innerHTML = "";

    const ARRAYPERSONAS = JSON.parse(localStorage.getItem("listaPersonas")) ?? [];
    if (id == -1) { ARRAYPERSONAS.push(PERSONA); }
    else { ARRAYPERSONAS[id] = PERSONA; }
    localStorage.setItem("listaPersonas", JSON.stringify(ARRAYPERSONAS));

    mostrarElementos();
    addWriterOptions();
    addListenerOptions();

}

/**
 * Guarda el producto en local Storage
 * 
 * @param {int} id En caso de que sea -1 (o no tenga ningún valor), el programa crea un nuevo producto, en caso contrario lo modifica.
 */
function newProduct(id = -1) {

    const PRODUCT = {

        nombre: document.getElementById("Name").value,
        fechaNac: document.getElementById("BornDate").value,
        fechaDef: document.getElementById("DeathDate").value,
        imagePath: document.getElementById("ImagePath").value,
        WikiPage: document.getElementById("WikiPage").value,
        creadores: personas,
        empresas: companies
    }

    personas = [];
    companies = [];

    document.getElementById("newItemForm").innerHTML = "";

    const ARRAYPRODUCTOS = JSON.parse(localStorage.getItem("listaProductos")) ?? [];
    if (id == -1) { ARRAYPRODUCTOS.push(PRODUCT); }
    else { ARRAYPRODUCTOS[id] = PRODUCT; }
    localStorage.setItem("listaProductos", JSON.stringify(ARRAYPRODUCTOS));

    mostrarElementos();
    addWriterOptions();
    addListenerOptions();

}

/**
 * Guarda la empresa en local Storage
 * 
 * @param {int} id En caso de que sea -1 (o no tenga ningún valor), el programa crea una nueva empresa, en caso contrario lo modifica.
 */
function newCompany(id = -1) {

    const COMPANY = {
        nombre: document.getElementById("Name").value,
        fechaNac: document.getElementById("BornDate").value,
        fechaDef: document.getElementById("DeathDate").value,
        imagePath: document.getElementById("ImagePath").value,
        WikiPage: document.getElementById("WikiPage").value,
        creadores: personas
    };

    document.getElementById("newItemForm").innerHTML = "";

    const ARRAYCOMPANIES = JSON.parse(localStorage.getItem("listaCompany")) ?? [];
    if (id == -1) { ARRAYCOMPANIES.push(COMPANY); }
    else { ARRAYCOMPANIES[id] = COMPANY; }
    localStorage.setItem("listaCompany", JSON.stringify(ARRAYCOMPANIES));

    personas = [];

    mostrarElementos();
    addWriterOptions();
    addListenerOptions();

}

/**
 * Añade a la lista indicada, el elemento escrito en el input
 * 
 * @param {int} list 0:lista personas
                     1:listas compañias
 */
function addToList(list) {

    (list == 0 ? personas : companies).push(document.getElementById(list == 0 ? "Addpersonas" : "AddCompany").value);
    document.getElementsByTagName("ul")[list].innerHTML += `
    <li value="${document.getElementById(list == 0 ? "Addpersonas" : "AddCompany").value}">
        ${document.getElementById(list == 0 ? "Addpersonas" : "AddCompany").value}
        <form>
            <input type="button" value="X" onclick="deleteFromList(this)">
        </form>
    </li>`;

}

/**
 * Añade un array completo a la lista undicado por list
 * 
 * @param {int} list 0:lista personas
                     1:listas compañias
 */
function arrayToList(list) {

    //0:lista personas
    //1:listas compañias

    (list == 0 ? personas : companies).forEach((element) => {
        document.getElementsByTagName("ul")[list].innerHTML += `
        <li value="${element}">
            ${element}
            <form>
                <input type="button" value="X" onclick="deleteFromList(this,${list})">
            </form>
        </li>`;
    });
}

/**
 * Elimina tanto de la lista como del array correspondiente un elemento
 * 
 * @param {String} element Nombre del elemento a eliminar
 * @param {int} list Lista de la que vamos a eliminar
 */
function deleteFromList(element, list) {

    (list == 0 ? personas : companies).splice((list == 0 ? personas : companies).indexOf(element.parentElement.getAttribute("value")), 1);
    element.parentElement.remove();

}
