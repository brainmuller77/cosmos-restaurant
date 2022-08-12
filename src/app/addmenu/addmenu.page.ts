import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ConnectionService } from 'ngx-connection-service';
import { LoadingService } from '../services/loading.service';
import { ServiceService } from '../services/service.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.page.html',
  styleUrls: ['./addmenu.page.scss'],
})
export class AddmenuPage implements OnInit {
  form: FormGroup;
  hasNetworkConnection: boolean;
  server;
  load:boolean;
  filterterm;
  isConnected = true;
  status: string;
  fileArr = [];
   imgArr = [];
   fileObj = [];

  constructor(private toastService: ToastService,
  //  private connectionService: ConnectionService,
    
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
   public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private serveService: ServiceService,
    private loadService: LoadingService,
    private http: HttpClient,) {
     /*  this.connectionService.monitor().subscribe(currentState => {
        this.hasNetworkConnection= this.isConnected;
        this.hasInternetAccess = currentState;
        if (this.hasNetworkConnection && this.hasInternetAccess) {
          this.status = 'ONLINE';
        
        console.log(this.status)
        } else {
          this.status = 'OFFLINE';
         this.toastService.presentToast(this.status + "Please Check Your Internet Connection")
        }
        
      }); */
     }
     activeSegment: FormControl = new FormControl('menu');
     segments: any[] = [
      { title: 'Menu', value: 'menu' },
      { title: 'Category', value: 'cat' },
      { title: 'Menu List', value: 'list' },
    ];
    category:any[] =[
      "ROASTED CHICKEN","CHARCOAL GRILLED","CHICKEN FILLETS","PASTRIES",
      "FRIED CHICKEN","SANDWICH","FISH DISHES","FISH FILLETS","SHAWARMA PLATE",
      "EXTRAS","RICE PLATE","JUICE", "ANY MIXES OF YOUR CHOICE"
    ]

  async ngOnInit() {
    this.server = this.serveService.server
    this.form = this.fb.group({
      file: [null],
      
      foodname:['',[
        Validators.required,
        Validators.maxLength(150)]],
      category:['',[
        Validators.required,
        Validators.maxLength(150)]],
     
      price:['',[
        Validators.required,
        Validators.maxLength(150)]],
     /*  negotiable:['',[
        Validators.required,
        Validators.maxLength(150)]],
 */
      })
   

  }

  click(){
    this.activeSegment.value == 'menu'
  }
  

  asubmitForm(){
    if(this.form.get('file').value === null){
      return this.toastService.presentToast("Please Add At Least One Image");
    }else{
     
        this.loadService.Loading();
            this.serveService.add(this.form.value).subscribe((res:any)=>{
              setTimeout(() => {
                // this.loadService.dismiss()
                console.log(res)
                if(res.success===true){
                  this.toastService.presentToast("Successfully Added")
                  this.form.reset()
                 this.fileArr = []
                  this.loadService.dismiss()
                }else{
                  this.toastService.presentToast("Network Error Please Try Again")
                  this.loadService.dismiss()
                }
                  
                  }, 5000);
            }) 
        
          }
         
   }

   dismiss() {
    this.modalController.dismiss();
    }

   /**
   * 
   * when file is selected
   */
    onFileChange(e)  {
      const fileListAsArray = Array.from(e);
      fileListAsArray.forEach((item, i) => {
        const file = (e as HTMLInputElement);
        const url = URL.createObjectURL(file[i]);
        this.imgArr.push(url);
        this.fileArr.push({ item, url: url });
      //  console.log(this.fileArr[0].item)
      })
      this.fileArr.forEach((item) => {
        this.fileObj.push(item.item)
  
      })
        // Set files form control
this.form.patchValue({
  file: this.fileObj
})
this.form.get('file').updateValueAndValidity()
  
// console.log(reader);
}
 // Clean Url
 sanitize(url: string) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

show:boolean=true
deleteImage(i: number) {
const a = this.fileArr.indexOf(i);
this.fileArr.splice(a,1)
this.show = false

}


items = []
  getMenu(){
    this.load = true
    this.serveService.get("getMenuItems").subscribe((res:any)=>{
      if(res.success === true){
        this.load = false
        this.items = []
        for(let a of res.results){
          this.items.push(a)
        }
      }
    })
  }

}
