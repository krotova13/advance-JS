class ProductList {
  #container;
  #goods;
  #productObjects;

  constructor(container = ".products") {
    this.#container = container;
    this.#goods = [];
    this.#productObjects = [];

    this.fetchGoodsData();
    this.render();
  }

  fetchGoodsData() {
    this.#goods = [
      {
        id: 1,
        title: "Notebook",
        price: 1000,
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
      },
      {
        id: 2,
        title: "Mouse",
        price: 100,
        img: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
      },
      {
        id: 3,
        title: "Keyboard",
        price: 250,
        img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        id: 4,
        title: "Gamepad",
        price: 150,
        img: "https://images.unsplash.com/photo-1633499737221-5e3406d4d952?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
    ];
  }

  getProductById(id) {
    for (let product of this.#goods) {
      if (product.id == id) {
        return product;
      }
    }
  }

  render() {
    const catalogBlock = document.querySelector(this.#container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);
      console.log(productObject);
      this.#productObjects.push(productObject);
      catalogBlock.insertAdjacentHTML(
        "beforeend",
        productObject.getHTMLString()
      );
    }
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = product.img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.title}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn" data-id="${this.id}">Купить</button>
                      </div>
                  </div>`;
  }
}

class GoodsList {
  #goodsItems;
  constructor() {
    this.#goodsItems = [];
  }

  redner() {}

  addProduct(productItem) {
    var existingProductItem;
    for (let good of this.#goodsItems) {
      if (good.id == productItem.id) {
        existingProductItem = good;
      }
    }

    if (existingProductItem) {
      existingProductItem.addItem();
    } else {
      this.#goodsItems.push(new GoodsListItem(productItem));
    }
  }

  getTotalPrice() {
    var totalPrice = 0;
    for (let item of this.#goodsItems) {
      totalPrice += item.getTotalPrice();
    }
    return totalPrice;
  }
}

class GoodsListItem {
  #productItem;
  #qty;

  constructor(productItem) {
    this.#productItem = productItem;
    this.#qty = 1;
  }

  addItem() {
    this.#qty++;
  }

  getTotalPrice() {
    this.#productItem.price * this.#qty;
  }

  getHTMLString() {
    return `<tr>
      <td>${this.#productItem.title}</td>
      <td>${this.#qty}</td>
      <td>${this.getTotalPrice()}</td>
    </tr>`;
  }
}

const catalog = new ProductList();
const cart = new GoodsList();

document.onclick = (event) => {
  if (event.target.classList.contains("buy-btn")) {
    let productId = event.target.dataset.id;
    let productItem = catalog.getProductById(productId);
    cart.addProduct(productItem);
  }
  console.log(cart);
};

// Modal
// Get the modal
var ebModal = document.getElementById("mySizeChartModal");

// Get the button that opens the modal
var ebBtn = document.getElementById("cart-btn");

// Get the <span> element that closes the modal
var ebSpan = document.getElementsByClassName("ebcf_close")[0];

// When the user clicks the button, open the modal
ebBtn.onclick = function () {
  ebModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
ebSpan.onclick = function () {
  ebModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == ebModal) {
    ebModal.style.display = "none";
  }
};
