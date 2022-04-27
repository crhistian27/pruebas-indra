import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})
export class Page2Page implements OnInit {

  public texto:any;
  public usedChars:any =[];
  public permArr:any=[];
  public resp:any;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {

    this.vaciar();
  }

  vaciar(){
    this.texto = '';
    this.permArr.splice(0, this.permArr.length); 
  }

  calcular(){

    var nuevoarr = [];

    if(this.texto == '' ){
      
      this.presentAlert('<p>No puede tener campos vacios en la cadena de texto</p>');
      return false;
    }

    if(this.texto.length > 3 ){
      
      this.presentAlert('<p>Maximo 3 caracteres</p>');
      return false;
    }

    for (let m = 0; m < this.texto.length; m++) {
        nuevoarr.push(this.texto[m])
    }

    this.permArr.splice(0, this.permArr.length); 
    var resp = this.permute(nuevoarr);

    console.log(resp);

    this.resp = resp;

   
  }

  permute(input) { 

    var i, ch; 
    for (i = 0; i < input.length; i++) 
    { 
      ch = input.splice(i, 1)[0]; 
      this.usedChars.push(ch); 
      if (input.length == 0) 
      { 
        this.permArr.push(this.usedChars.slice()); 
      } 
      this.permute(input); 
      
      input.splice(i, 0, ch); 
      this.usedChars.pop(); 
    } 
    return this.permArr 
  };



  limpiar(){
    this.vaciar();
    this.presentToast('limpiada exitosa')
  }

  doRefresh(event) {

    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  irfooter(page){

    this.router.navigate([ page ]).then(res => { 
      /* location.reload(); */
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }
  
  async presentAlert(contenido: string,) {
    const alert = await this.alertController.create({
      cssClass: 'alertanormal',
      header: '',
      subHeader: '',
      message: contenido,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'btnalertanormal',
          handler: (blah) => {
            handler: () => false
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast( infoMessage: string) { 
    const toast = await this.toastController.create({ 
      message: infoMessage,
      duration: 2000
    });
    toast.present();
  }

}
