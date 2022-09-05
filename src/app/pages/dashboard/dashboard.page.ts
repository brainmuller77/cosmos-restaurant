import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FeedlistPage } from 'src/app/feedlist/feedlist.page';
import { OrderlistPage } from 'src/app/orderlist/orderlist.page';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  orderstoday:number;
  customerbase:number;
  totalsales:number=6000;
  salestoday:number=800;
  suggestlength:number
  complainlength:number
  userheader:string = 'UserName';
  altheader:string = 'Amount Spent';
  

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [75, 49, 89, 31, 86, 35, 50], label: 'Income'},
    {data: [48, 38, 65, 39, 66, 17, 80], label: 'Expenses'}
  ];

  ngOnInit() {

    
    this.getorders()
    this.getfeedback()
    this.getCus()
  }

  openMenu() {
    
    this.router.navigate(['./addmenu']);
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  constructor(private service:ServiceService,
    private router:Router,
    private modalController: ModalController,){

  }
  async openorderspage(){
    const modal = await this.modalController.create({
      component: OrderlistPage,  
      
      swipeToClose: true 
      });
      //console.log(user.imagePath)
      return await modal.present();
  }

  async opensuggestpage(){
    const modal = await this.modalController.create({
      component: FeedlistPage,  
      componentProps:{val:"suggestion"},
      swipeToClose: true 
      });
      //console.log(user.imagePath)
      return await modal.present();
  }

  async opencomplainpage(){
    const modal = await this.modalController.create({
      component: FeedlistPage,  
      componentProps:{val:"complain"},
      swipeToClose: true 
      });
      //console.log(user.imagePath)
      return await modal.present();
  }

  async opencustomerspage(){
    const modal = await this.modalController.create({
      component: FeedlistPage, 
      componentProps:{cust:this.customer,val:"customers"}, 
      swipeToClose: true 
      });
      //console.log(user.imagePath)
      return await modal.present();
  }


  orders:any[]=[]
  getorders(){
    this.service.get("getOrders").subscribe((response:any)=>{
      if(response.success === true){
        this.orders = []
        for(let post of response.results){
          this.orders.push(post)
        }
        this.orderstoday = this.orders.length
      }
    })
  }

  customer:any[]=[]
  getCus(){
    this.service.get("getCustomer").subscribe((response:any)=>{
      if(response.success === true){
        this.customer = []
        for(let post of response.results){
          this.customer.push(post)
        }
        this.customerbase = this.customer.length
      }
    })
  }

  complain:any[]=[]
  suggest:any[]=[]
  number:number = 0
  getfeedback(){
    this.service.get("getFeedback").subscribe((response:any)=>{
      if(response.success === true){
        this.complain = [];this.suggest = []
        for(let post of response.results){
          if(post.title === "suggestions"){
            this.suggest.push(post)
            this.suggestlength = this.suggest.length
          }else{
            this.complain.push(post)
            this.complainlength = this.complain.length
          }
         
        }
      }
    })
  }

}
