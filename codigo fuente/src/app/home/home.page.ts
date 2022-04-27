import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public array:any ={}
  public dias:any ;

  public array2:any =["","","","","","","",""];

  constructor(
    public alertController: AlertController,
    public router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.vaciar();
  }

  vaciar(){
    this.array.punto0 = undefined;
    this.array.punto1 = undefined;
    this.array.punto2 = undefined;
    this.array.punto3 = undefined;
    this.array.punto4 = undefined;
    this.array.punto5 = undefined;
    this.array.punto6 = undefined;
    this.array.punto7 = undefined;
    this.array.punto8 = undefined;
    this.dias = undefined;
    this.array2=["","","","","","","",""];
  }
  

  calcular(){
    
    if(this.array.punto0 == undefined || this.array.punto1 == undefined || this.array.punto2 == undefined || this.array.punto3 == undefined || this.array.punto4 == undefined ||this.array.punto5 == undefined || this.array.punto6 == undefined || this.array.punto7 == undefined ){
      
      this.presentAlert('<p>No puede tener campos vacios en las casas</p>');
      return false;
    }

    if(this.array.punto0 > 1 || this.array.punto1 > 1 || this.array.punto2> 1 || this.array.punto3 > 1 || this.array.punto4 > 1 ||this.array.punto5 > 1 || this.array.punto6 > 1 || this.array.punto7 > 1 ){
      
      this.presentAlert('<p>Solo puedes utilizar valores 1 y 0 en las casas</p>');
      return false;
    }

    if(this.dias== undefined){
      this.presentAlert('<p>Digite el numero de dias</p>');
      return false;

    }

    var arr = [this.array.punto0,this.array.punto1,this.array.punto2,this.array.punto3,this.array.punto4,this.array.punto5,this.array.punto6,this.array.punto7];
    var nuevoarr = [];

    for (let m = 0; m < this.dias; m++) {
    
      if(m != 0){
        arr.splice(0, arr.length);
        arr = nuevoarr.slice();
        nuevoarr.splice(0, nuevoarr.length);
      }
      for (let i = 0; i < arr.length; i++) {
      
        if(i == 0){
          var ant = arr[i-1];
          var desp = arr[i+1];
          if(0 == desp){
            nuevoarr.push(0)
          }else{
            nuevoarr.push(1)
          }
        }else if(i == (arr.length-1)){
          var ant = arr[i-1];
          var desp = arr[i+1];
         
          if(ant == 0){
            nuevoarr.push(0)
          }else{
            nuevoarr.push(1)
          }
        }else{
          var ant = arr[i-1];
          var desp =arr[i+1];
          if(ant == desp){ 
            nuevoarr.push(0)
          }else{
            nuevoarr.push(1)
          }
        }
        
      }
    }

    console.log(nuevoarr);

    this.array2 = nuevoarr;
    
  }

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
