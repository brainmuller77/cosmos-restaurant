import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { ServiceService } from '../services/service.service';
import { ToastService } from '../services/toast.service';
import {DeviceUUID} from 'src/assets/js/device-uuid'
import { HomePage } from '../home/home.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { DomSanitizer } from '@angular/platform-browser';
import { FoodorderPage } from '../foodorder/foodorder.page';

@Component({
  selector: 'app-foodmenu',
  templateUrl: './foodmenu.page.html',
  styleUrls: ['./foodmenu.page.scss'],
})
export class FoodmenuPage implements OnInit {
  activeSegment: FormControl = new FormControl('menu');
  form: FormGroup;
  filterterm:string
  cartCostItem = 0
  load:boolean
  loaded:boolean
  show:boolean = false
  segments: any[] = [
    { title: 'Menu List', value: 'menu' },
    { title: 'Cart', value: 'order' },
    { title: 'Feedback', value: 'feed' }, 
  ];

  discover:any[] = [
    {value:'burger'},
    {value:'pizza'},
    {value:'fries'},
  ]
  category:any[] =[
    "ROASTED CHICKEN","CHARCOAL GRILLED","CHICKEN FILLETS","PASTRIES",
    "FRIED CHICKEN","SANDWICH","FISH DISHES","FISH FILLETS","SHAWARMA PLATE",
    "EXTRAS","RICE PLATE","JUICE", "ANY MIXES OF YOUR CHOICE"
  ]

  basket: any = [];
  backup : any = [];
  items = [{
    id:"1",
    foodname:"Delicious Pizza",
    details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
    image:"assets/images/f1.png",
    price:50,
    quantity:0,
    cost:0
  },{
  id:"2",
  foodname:"Delicious Fried Chicken",
  details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
  image:"assets/images/f2.png" ,
  price:50,
  quantity:0,
  cost:0
},
{
  id:"3",
  foodname:"Delicious Fried Rice",
  details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
  image:"assets/images/f3.png" ,
  price:50,
  quantity:0,
  cost:0
},
{
  id:"4",
  foodname:" Fried Chicken",
  details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
  image:"assets/images/f4.png" ,
  price:50,
  quantity:0,
  cost:0
},
{
  id:"5",
  foodname:"Delicious Fried Chicken",
  details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
  image:"assets/images/f5.png" ,
  price:60,
  quantity:0,
  cost:0
},
{
  id:"6",
  foodname:"Delicious Fried Chicken",
  details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
  image:"assets/images/f6.png" ,
  price:80,
  quantity:0,
  cost:0
},
{
  id:"7",
  foodname:"Tasty Burger",
  details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
  image:"assets/images/f7.png" ,
  price:500,
  quantity:0,
  cost:0
},
{
  id:"8",
  foodname:"Delicious Fried Chicken",
  details:"This is a fried food with two chicken on it..it is made with the best of the items you know of",
  image:"assets/images/f8.png" ,
  price:500,
  quantity:0,
  cost:0
},
]
  uuid
  server
  constructor( public fb: FormBuilder,
    public serveService: ServiceService,
    private router:Router,
    private sanitizer: DomSanitizer,
    private alertController:AlertController,
    private modalController: ModalController,
    public loadingCtrl:LoadingService,
    private toast: ToastService) { }

  ngOnInit() {
    this.form = this.fb.group({
      avatar: [null],
      body:[''],
      number:[''],
      userid:[''],
      title:['']
    })
  
    this.uuid = new DeviceUUID().get();   
    this.server = this.serveService.server
    this.getItems()
  }

  hi(a){
   let non:string = a;
   this.filterterm = non
   this.show =!this.show
  }

  sser(){
    this.show =!this.show
  }

  async open(){
    const modal = await this.modalController.create({
      component: DashboardPage,   
      });
      //console.log(user.imagePath)
      return await modal.present();
  }

  feedback(){
    if(this.form.valid){
      this.loaded = true
      this.form.get('userid').setValue(this.uuid)
      this.serveService.post(this.form.value,"feedback").subscribe((res:any)=>{
        setTimeout(() => {
        if(res.success === true){
          //this.toast.presentToast("Please your order has been submitted we will get back to you shortly")
          this.serveService.alert("Feeback","Please we appreciate your feedback and promise to make things better the next time round. Thank you for staying with us.")
          this.basket = []
          this.loaded = false
        }else{
         
            this.serveService.alert("Failed", "Order Failed Please Try Again")
          }
          this.load = false
        },15000);
      })
        }
    
      }
  
  mynum:number
  cus = []
  tablenum:number = 1
  save(){
    this.load = true
    let body = {
      items:this.basket,
      tablenum:this.tablenum,
      userid:this.uuid,
      total:this.cartTotal
    }
   this.serveService.post(body,"addItem").subscribe((res:any)=>{
   // setTimeout(() => {
    if(res.success === true){

      for(let vas of res.results){
        this.cus.push(vas)
      }
      this.load = false
    this.track()
      //this.toast.presentToast("Please your order has been submitted we will get back to you shortly")
    //  this.serveService.alert("Order Completed","Please your order has been submitted we will get back to you shortly")
      //
      this.basket = []
      this.cartTotal = 0
    }else{
      
        this.serveService.alert("Failed", "Order Failed Please Try Again")
    }
    //  }, 5000);
    
   })
  }

  add(x) {
   
    
    // If the item already exists, add 1 to quantity
    if (this.basket.includes(x)) {
     
    x.quantity = x.quantity += 1;
    this.cartCostItem = x.price * x.quantity;
      
    } else {
     
        this.basket.push(x);
        x.quantity += 1;
        this.cartCostItem = x.price * x.quantity;
    }
    this.calculateTotal();
  }

  
  
  reduce(x) {
    // Check if last item, if so, use remove method
    if (this.basket[this.basket.indexOf(x)].quantity === 1) {
      this.remove(x);
    } else {
      this.basket[this.basket.indexOf(x)].quantity = this.basket[this.basket.indexOf(x)].quantity - 1;
    
    }
    this.calculateTotal();
  }

 

 

  remove(x) {
    // Check if item is in array
    if (this.basket.includes(x)) {
      // Splice the element out of the array
      const index = this.basket.indexOf(x);
      if (index > -1) {
        // Set item quantity back to 1 (thus when readded, quantity isn't 0)
        this.basket[this.basket.indexOf(x)].quantity = 1;
        this.basket.splice(index, 1);
      }
    }
    this.calculateTotal();
  }
  cartTotal: number;
  cartNumItems: number;
  calculateTotal() {
    let total = 0;
    let cartitems = 0;
    // Multiply item price by item quantity, add to total
    this.basket.forEach(function (x) {
      total += (x.price * x.quantity);
      x.cost = (x.price * x.quantity)
      cartitems += x.quantity;
    });
    this.cartTotal = total;
    this.cartNumItems = cartitems;
  }

  // Remove all items from cart
  clearCart() {
    // Reduce back to initial quantity (1 vs 0 for re-add)
    this.basket.forEach(function (x) {
      x.quantity = 0;
    });
    // Empty local ticket variable then sync
    this.basket = [];
  
    this.calculateTotal();
  }

  register(){
    this.alertController.create({
      header: 'Register With Us',
     
      inputs:[
        {
          name: 'cname',
          placeholder: 'ENTER NAME'
        },
        {
          name: 'cnum',
          placeholder: 'ENTER NUMBER'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
          }
        },
        
        {
          text: 'Save',
          handler: (data) => {
           let body = {
             cname:data.cname,
             cnum:data.cnum             
           }
           this.serveService.post(body,"addCustomer").subscribe((response)=>{
              if(response.success===true) {      
                this.toast.presentToast(response.msg)
              }
              if(response.success===false){
                this.toast.presentToast(response.msg) 
              }
           })
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  async track(){
   await this.alertController.create({
      header: 'Please Kindly Leave Your Number With Us To Get Further Updates About Your Order',
     
      inputs:[
       /*  {
          name: 'cname',
          placeholder: 'ENTER NAME'
        }, */
        {
          name: 'cnum',
          placeholder: 'ENTER NUMBER'
        },
      ],
      buttons: [
       /*  {
          text: 'Cancel',
          handler: () => {
            
          }
        }, */
        
        {
          text: 'OK',
          handler: (data) => {
           let body = {
            cinfo:this.cus,
             cnum:data.cnum             
           }
           this.serveService.post(body,"updateCustomer").subscribe((response)=>{
              if(response.success===true) {      
                this.serveService.alert("Order Completed","Please your order has been submitted we will get back to you shortly")
      
              }
              if(response.success===false){
                this.toast.presentToast(response.msg) 
              }
           })
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
 // Clean Url
 sanitize(url: string) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

  getItems(){
    this.serveService.get("getMenuItems").subscribe((res:any)=>{
      if(res.success === true){
        this.items = [];
        //this.category = []
        for(let a of res.results){
          this.items.push(a)
          //this.category.push(a.category)
        }

      }
    })
  }


}
