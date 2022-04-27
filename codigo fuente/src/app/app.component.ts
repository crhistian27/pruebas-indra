import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, {static : true }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private location: Location,
  ) {

    this.backButtonEvent();
  }

  backButtonEvent(){
    this.platform.backButton.subscribeWithPriority(1, () => {
      if(!this.routerOutlet.canGoBack()){
        
        this.backButtonAlert();
      }else{ 
        this.location.back();
       }
     
    });
  }

  async backButtonAlert(){
    const alert = await this.alertController.create({
      cssClass: 'alertaConfirmacion',
      header: '',
      message: '<p>Deseas salir de la aplicacion?</p>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'btnalertaConfirmacionno',
          handler: () => false
        }, {
          text: 'SI',
          cssClass: 'btnalertaConfirmacionsi',
          handler: () => {
            navigator['app'].exitApp();
          } 
        }
      ]
    });

    await alert.present();
  }
}
