import { Injectable } from "@angular/core";
import {AngularFireDatabase} from 'angularfire2/database';
import { Item } from "../../models/item/item.model";
 
@Injectable()
export class ShoppingListService {

   // private shoppingListRef =this.db.list<Item>('shopping-list');
    
    items : {}[];

    constructor (private db: AngularFireDatabase){
        
    }
    /* Affiche les éléments de la base de données dans l'appli  */
    getShoppingList()
    {
        this.db.list("/shopping-list").valueChanges().subscribe((data) => {
           console.log("DATA", data);
           
            this.items = data;
        });
        console.log("GetshoppingList",this.items);
        return this.items;
    }
    // ajoute un élément  //
    addItem(item :Item) // ca marche
    {
        item.key = this.createKey();
        this.db.object(`/shopping-list/${item.key}`).set(item);
    }

    // modifie un élément  //
    editItem(item :Item) //  a regler
    {
       const toSave = this.db.object(`/shopping-list/${item.key}`);
        toSave.update(item);
    }
    
    // supprime un élément  //
    removeItem(key :number) // ca marche
    {
        const toDelete = this.db.object(`/shopping-list/${key}`);
        toDelete.remove();
    }

   

    // Fonction qui gérère une nouvelle clé pour l'objet //

    createKey = (function () {

        // Modélisé d'après les caractères sécuritaires
        // pour le Web de base64, mais ordonné par ASCII.
    
        var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    
    
    
        /** Horodatage de la dernière pression, utilisé 
         * pour prévenir les collisions locales si vous appuyez 
         * deux fois en une ms.
         * 
         */
    
        var lastPushTime = 0;
    
    
    
        // Nous générons 72 bits de caractère aléatoire
        // qui sont transformés en 12 caractères 
        // et ajoutés à la balise 
        //  
        // horodatage pour éviter les collisions
        // avec d'autres clients.  Nous stockons 
        // les derniers caractères que nous
        //
        // généré car en cas de collision, nous utiliserons 
        // les mêmes caractères, sauf que
        //
        // "incrémenté" de un.
    
        var lastRandChars = [];
    
    
    
        return function () {
    
          var now = new Date().getTime();
    
          var duplicateTime = (now === lastPushTime);
    
          lastPushTime = now;
    
    
    
          var timeStampChars = new Array(8);
    
          for (var i = 7; i >= 0; i--) {
    
            timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
    
            // NOTE : Je ne peux pas utiliser 
            //<<< ici car javascript va se convertir en int
            // et perdre les bits supérieurs.    

            now = Math.floor(now / 64);
    
          }
    
          if (now !== 0) throw new Error('We should have converted the entire timestamp.');
    
    
    
          var id = timeStampChars.join('');
    
    
    
          if (!duplicateTime) {
    
            for (i = 0; i < 12; i++) {
    
              lastRandChars[i] = Math.floor(Math.random() * 64);
    
            }
    
          } else {
    
           // Si l'horodatage n'a pas changé depuis 
           //la dernière pression, utilisez le même nombre aléatoire, 
           //mais incrémenté de 1.    
            for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
    
              lastRandChars[i] = 0;
    
            }
    
            lastRandChars[i]++;
    
          }
    
          for (i = 0; i < 12; i++) {
    
            id += PUSH_CHARS.charAt(lastRandChars[i]);
    
          }
    
          if (id.length != 20) throw new Error('Length should be 20.');
    
    
    
          return id;
    
        };
    
      })();
}
