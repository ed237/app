import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
//import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  item: Item;
  //shoppingList: {}[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private shopping : ShoppingListService,
   ) 
    {

    }

  ionViewWillLoad() {
    this.item = this.navParams.get('item');
  }
 
// Fonciton modifier
  saveItem(item : Item){
    console.log(item);
    this.shopping.editItem(item);
    this.navCtrl.setRoot('HomePage');
  }

  // fonction suprimer (ok)
  removeItem(key : number){
    
    this.shopping.removeItem(key)
    this.navCtrl.pop(); 
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad EditShoppingItemPage');
  }
}

