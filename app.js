// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;
// Entrada.
const products = [
  {
    description: "Goma de borrar",
    price: 0.25,
    tax: LOWER_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Lápiz H2",
    price: 0.4,
    tax: LOWER_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Cinta rotular",
    price: 9.3,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Papelera plástico",
    price: 2.75,
    tax: REGULAR_TYPE,
    stock: 5,
    units: 0,
  },
  {
    description: "Escuadra",
    price: 8.4,
    tax: REGULAR_TYPE,
    stock: 3,
    units: 0,
  },
  {
    description: "Pizarra blanca",
    price: 5.95,
    tax: REGULAR_TYPE,
    stock: 2,
    units: 0,
  },
  {
    description: "Afilador",
    price: 1.2,
    tax: LOWER_TYPE,
    stock: 10,
    units: 0,
  },
  {
    description: "Libro ABC",
    price: 19,
    tax: EXEMPT_TYPE,
    stock: 2,
    units: 0,
  },
];

// GENERAR HTML DINÁMICO

var container = document.getElementById("product-list-container");

var letMeCalculate = () => {
 var i = 0;
 while (i < products.length) {
  if (products.units === 0) {
      return document.getElementById("calculate").disabled = true;
    }
    return document.getElementById("calculate").disabled = false;
  }
  
}
 

var createProduct = product => {
      var description = document.createElement("h5");
      var unitPrice = document.createElement("span");
      var unitCount = document.createElement("input");
      description.innerText = product.description;
      unitPrice.innerText = product.price  + "€/ud.";
      unitCount.setAttribute("type", "number");
      unitCount.setAttribute("value", 0);
      unitCount.setAttribute("min", 0);
      unitCount.setAttribute("max", product.stock);
      unitCount.addEventListener("change", (event) => {
        product.units = parseInt(event.target.value)
        document.getElementById("calculate").disabled = letMeCalculate();
      })
      container.appendChild(description);
      container.appendChild(unitPrice);
      container.appendChild(unitCount);
}

var showProducts = productList => {
    for (var product of productList) {
      createProduct(product);
    }
}

showProducts(products);

// CALCULAR FACTURA DEL CARRITO

var getSubTotal = () => {
  var subTotal = 0;
  for (var product of products) {
    subTotal += product.price * product.units;
  }
  return subTotal;
}

var getVat = () => {
  var VAT = 0;
  for (var product of products) {
    var subTotal = product.price * product.units;
    VAT += subTotal * product.tax / 100
  }
  return VAT;
}


var showTotal = () =>{
  var subTotal = getSubTotal();
  var VAT = getVat();
  var TotalPrice = subTotal + VAT;
  document.getElementById("subTotal").innerText = subTotal;
  document.getElementById("iva").innerText = VAT;
  document.getElementById("totalPrice").innerText = TotalPrice;
}

document.getElementById("calculate").addEventListener("click", showTotal);