const stockProductos = [
  {
    id: 1,
    nombre: "Cinturo de Varon  Cuero",
    cantidad: 1,
    desc: "Cinturón",
    precio: 80,
    img: "img/belt.jpg",
  },
  {
    id: 2,
    nombre: "Chompa de dormir",
    cantidad: 1,
    desc: "Chompa",
    precio: 180,
    img: "img/clothes-1.jpg",
  },
  {
    id: 3,
    nombre: "Chompilla",
    cantidad: 1,
    desc: "Chompa",
    precio: 120,
    img: "img/clothes-2.jpg",
  },
  {
    id: 4,
    nombre: "Falda Campana verde",
    cantidad: 1,
    desc: "Falda",
    precio: 190,
    img: "img/clothes-3.jpg",
  },
  {
    id: 5,
    nombre: "Falda Campanilla Oscuro Crepúsculo",
    cantidad: 1,
    desc: "Falda",
    precio: 160,
    img: "img/clothes-4.jpg",
  },
  {
    id: 6,
    nombre: "Chaqueta de Varón Marrón",
    cantidad: 1,
    desc: "Chaqueta",
    precio: 340,
    img: "img/jacket-1.jpg",
  },
  {
    id: 7,
    nombre: "Chaqueta de Varón Café Oscuro",
    cantidad: 1,
    desc: "Chaqueta",
    precio: 350,
    img: "img/jacket-2.jpg",
  },
  {
    id: 8,
    nombre: "Chaqueta de Varón Plomo",
    cantidad: 1,
    desc: "Chaqueta",
    precio: 350,
    img: "img/jacket-3.jpg",
  },
  {
    id: 9,
    nombre: "Chaqueta de Varón Lila",
    cantidad: 1,
    desc: "Chaqueta",
    precio: 340,
    img: "img/jacket-4.jpg",
  },
  {
    id: 10,
    nombre: "BLazer Café Claro",
    cantidad: 1,
    desc: "Blazer",
    precio: 420,
    img: "img/jacket-5.jpg",
  },
  {
    id: 11,
    nombre: "BLazer Café Oscuro",
    cantidad: 1,
    desc: "Blazer",
    precio: 420,
    img: "img/jacket-6.jpg",
  },
  {
    id: 12,
    nombre: "Pendientes Oro 18 Klts.",
    cantidad: 1,
    desc: "Pendientes",
    precio: 420,
    img: "img/jewellery-1.jpg",
  },
  {
    id: 13,
    nombre: "Pendientes Plata 950",
    cantidad: 1,
    desc: "Pendientes",
    precio: 420,
    img: "img/jewellery-2.jpg",
  },
  {
    id: 14,
    nombre: "Colgante Plata 925",
    cantidad: 1,
    desc: "Colgante",
    precio: 420,
    img: "img/jewellery-3.jpg",
  },
  {
    id: 15,
    nombre: "Zapatos Tacos Rosa Palo",
    cantidad: 1,
    desc: "Calzado",
    precio: 175,
    img: "img/party-wear-1.jpg",
  },
  {
    id: 16,
    nombre: "Zapatos Tacos Amarillo",
    cantidad: 1,
    desc: "Calzado",
    precio: 180,
    img: "img/party-wear-2.jpg",
  },
  {
    id: 17,
    nombre: "Calzado de Hombre Tipo A",
    cantidad: 1,
    desc: "Calzado",
    precio: 420,
    img: "img/shoe-1.jpg",
  },
  {
    id: 18,
    nombre: "Calzado de Hombre Tipo B",
    cantidad: 1,
    desc: "Calzado",
    precio: 420,
    img: "img/shoe-2.jpg",
  },
  {
    id: 19,
    nombre: "Calzado de Hombre Tipo C",
    cantidad: 1,
    desc: "Calzado",
    precio: 420,
    img: "img/shoe-3.jpg",
  },
  {
    id: 20,
    nombre: "Calzado de Hombre Tipo D",
    cantidad: 1,
    desc: "Calzado",
    precio: 620,
    img: "img/shoe-4.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#procesar-pago");

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
  formulario.addEventListener("submit", enviarCompra);
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Sin Artículos Seleccionados!",
        text: "Seleccionar un artículo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem; margin: 12px;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-danger" onclick="agregarProducto(${id})" style="margin-left:18%;">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor" style="border: 2px solid black; border-radius: 5px; margin-bottom: 5px; padding:10px; background: #2b2d42; color:#EDF2F4;">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>${nombre}</p>
      <p>Precio: ${precio} Bs.</p>
      <p>Cantidad: ${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-danger parrafo">Sin lista de compras!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault();
  const cliente = document.querySelector("#cliente").value;
  const email = document.querySelector("#correo").value;

  if (email === "" || cliente == "") {
    Swal.fire({
      title: "¡Completar nombre y ci!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    const btn = document.getElementById("button");

    // document.getElementById('procesar-pago')
    //  .addEventListener('submit', function(event) {
    //    event.preventDefault();

    btn.value = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_qxwi0jn";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Finalizar compra";
        alert("Correo enviado!");
      },
      (err) => {
        btn.value = "Finalizar compra";
        alert(JSON.stringify(err));
      }
    );

    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");
      formulario.reset();

      const alertExito = document.createElement("p");
      alertExito.classList.add(
        "alert",
        "alerta",
        "d-block",
        "text-center",
        "col-12",
        "mt-2",
        "alert-success"
      );
      alertExito.textContent = "Compra realizada exitosamente!";
      formulario.appendChild(alertExito);

      setTimeout(() => {
        alertExito.remove();
      }, 3000);
    }, 3000);
  }
  localStorage.clear();
}
