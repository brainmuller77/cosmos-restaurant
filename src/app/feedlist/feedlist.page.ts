import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { ToastService } from '../services/toast.service';
import * as moment from 'moment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-feedlist',
  templateUrl: './feedlist.page.html',
  styleUrls: ['./feedlist.page.scss'],
})
export class FeedlistPage implements OnInit {
  cusval=[]
  cust
  val
  activeSegment: FormControl = new FormControl();
  
  segments: any[] = [
    { title: 'Complaints', value: 'complain' },
    { title: 'Suggestions', value: 'suggestion' },
  ];
  constructor(protected service:ServiceService,
    private sms: SMS,private alert:AlertController,
    private http:HttpClient,
    private modalController: ModalController,private toast:ToastService) { 
      this.activeSegment.value == this.val
    }

  ngOnInit() {
    
    this.getfeedback()
    console.log(this.val)
    if(this.val=="customers"){
    for (let data of this.cust){
      this.cusval.push(data)
    }
    console.log(this.cusval)
  }
  }

   //moment tym
   timeFromNow(time) {
    return moment(time).fromNow();
  }

  async sendSms(mes) {
    let alert = this.alert.create({
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
            this.service.post(body,"testsms").subscribe((res:any)=>{
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


  dismiss(){
    this.modalController.dismiss()
  }


  call(item){
    window.open('tel:'+item.phone)
   }

  /* contact(mes){
  
    let body = {
      number:mes.phone,
      message:""
    }
    this.service.post(body,"testsms").subscribe((res:any)=>{
      if(res.success===true){
        this.toast.presentToast("Success")
      }
    })
  } */

  complain:any[]=[]
  suggest:any[]=[]
  getfeedback(){
    this.service.get("getFeedback").subscribe((response:any)=>{
      if(response.success === true){
        this.complain = [];this.suggest = []
        for(let post of response.results){
          if(post.title === "suggestions"){
            this.suggest.push(post)
          }else{
            this.complain.push(post)
          }
         
        }
      }
    })
  }

  
}
