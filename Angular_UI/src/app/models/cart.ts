export class Cart {

  productsInCart: any = [];
  private totalCartPrice: number = 0;
  totalCartCount: number = 0;
  /**
   *
   */
  constructor() {

  }

  get getTotalCartPrice() {
    return this.totalCartPrice.toFixed(2) as unknown as number;
  }

  private calculateTotalCartPrice() {
    this.totalCartPrice = 0;
    this.productsInCart.forEach((product: any) => {
      if (product.discountedPrice == 0) {
        this.totalCartPrice += Number(product.price) * Number(product.ammount);
      }
      else {
        this.totalCartPrice += Number(product.discountedPrice) * Number(product.ammount);
      }
    });
  }

  private calculateTotalCartCount() {
    this.totalCartCount = 0;
    this.productsInCart.forEach((product: any) => {
      this.totalCartCount += Number(product.ammount);
    });
  }

  refreshCart() {
    this.calculateTotalCartPrice();
    this.calculateTotalCartCount();
  }

  addProductToCart(product: any) {

    let productToAdd = product;

    if(this.productsInCart.some((p: { name: any })=> p.name === product.name))
    {
      productToAdd.ammount += 1;
    }
    else {
      this.productsInCart.push(productToAdd);
    }

    this.refreshCart();
  }
}

