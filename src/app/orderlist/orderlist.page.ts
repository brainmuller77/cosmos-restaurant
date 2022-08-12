import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.page.html',
  styleUrls: ['./orderlist.page.scss'],
})
export class OrderlistPage implements OnInit {

  constructor(private service:ServiceService,private modalController: ModalController,
    private toast:ToastService,
              private alertController:AlertController) { }

  ngOnInit() {
    this.getorders()
  }

  dismiss(){
    this.modalController.dismiss()
  }

  load:boolean
  orders:any[]=[]
  getorders(){
    this.load = true
    this.service.get("getOrders").subscribe((response:any)=>{
      if(response.success === true){
        this.load = false
        this.orders = []
        for(let post of response.results){
          this.orders.push(post)
        }
      }
    })
  }

  async sendSms(mes) {
    let alert = this.alertController.create({
      header:"Send SMS",
      inputs: [
        {
          name: 'message',
          placeholder: 'ENTER MESSAGE'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'SUBMIT',
          handler: data => {
            let body = {
              number:mes.phone,
              message:data.message
            }
            this.service.post(body,"sms").subscribe((res:any)=>{
              if(res.success===true){
                this.toast.presentToast("Success")
              }
            })
        }
        }
      ]
    });
    (await alert).present();
  }

  
  deliver(post){
    this.alertController.create({
      header: 'Confirm',
     
      message: 'Do you want to deliver this item?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log(post);
          }
        },
        
        {
          text: 'Yes!',
          handler: () => {
           let body = {
             id:post.id,
             tablename:'orders'
             

           }
           this.service.post(body,"updateState").subscribe((response)=>{
              if(response.success===true) {
              
            const index = this.orders.indexOf(post)
            this.orders.splice(index,1)
              }
           })
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }




}
