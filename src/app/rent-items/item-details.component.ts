import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent {
  @Input() item: any;
  activeTab: string = 'details';

  setMainImage(image: string): void {
    this.item.image = image;
  }

  addToCart(item: any): void {
    console.log(`${item.name} added to cart.`);
    // Implement your add-to-cart logic here
  }

  buyNow(item: any): void {
    console.log(`Buying ${item.name} now.`);
    // Implement your buy-now logic here
  }

  toggleTab(tab: string): void {
    this.activeTab = tab;
  }
}
