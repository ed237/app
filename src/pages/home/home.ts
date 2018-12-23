import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//creation d'une liste d'éléments vide
  shoppingList: {}[];

  constructor(public navCtrl: NavController,
    private db : AngularFireDatabase) 
    {
      this.db.list("/shopping-list").valueChanges().subscribe((data)=>{
        this.shoppingList = data;
      })
      
    }


}
