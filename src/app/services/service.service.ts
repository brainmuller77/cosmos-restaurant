import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AlertController } from '@ionic/angular';
import { ToastService } from './toast.service';
import { ConnectionService } from 'ngx-connection-service';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

//  apiUrl: string = 'http://localhost/visam/server'; server: string= 'http://localhost/visam/server/';	
//apiUrl: string = 'https://pawachat.com/visam/server'; server:string="https://pawachat.com/visam/server/";
apiUrl;
server
hasNetworkConnection: boolean;
  hasInternetAccess:boolean;
  isConnected = true;
  status: string;
headers = new HttpHeaders().set('Content-Type', 'application/json');
imageUrl
constructor(private http: HttpClient,
  private toast: ToastService,
  //  private connectionService: ConnectionService,
    public alertController:AlertController){
 /*  this.connectionService.monitor().subscribe(currentState => {
    this.hasNetworkConnection= this.isConnected;
    this.hasInternetAccess = currentState.hasInternetAccess;
    if (this.hasNetworkConnection && this.hasInternetAccess) {
      this.status = 'ONLINE';
    
    console.log(this.status)
    } else {
      this.status = 'OFFLINE';
     this.toast.presentToast(this.status + "Please Check Your Internet Connection")
    }
  
 }) */
 this.apiUrl = environment.url;
  this.server = environment.server
 this.imageUrl = window.location.host+"/"
  console.log(this.imageUrl)
    }
 imgError(e: any) {
  e.target.src = 'assets/images/f1.png';
}

add(images: File) {
  var arr: any[] = [];
  var formData = new FormData();
  arr.push(images);
  console.log(arr)
  if(arr[0]['file'] !== null){
    arr[0]['file'].forEach((item: any, i: number) => {
      formData.append('file', arr[0]['file'][i]);
    });
  }
  //formData.append('description',arr[0].description);
  formData.append('foodname',arr[0].foodname);
  formData.append('price',arr[0].price);
  formData.append('category',arr[0].category);
 // formData.append('de',arr[0].details);
  return this.http.post(`${this.apiUrl}/upload.php`, formData, {
    
  }).pipe(
    catchError(this.error)
  )
}


 async alert(header,message){
  const alert = await this.alertController.create({
    header: header,
    message: message,
    buttons: [
      {
        text: 'OK',
        handler: () => {
        }
      }
        
        ]
      })
      alert.present()
}

  loginUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}/login.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  post(data,file): Observable<any> {
    let API_URL = `${this.apiUrl}`+file+'.php';
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  get(filename:string): Observable<any> {
  //  this.url = '?_page=' + this.page_number + '&_limit=' + this.page_limit;
    let API_URL = `${this.apiUrl}`+filename+'.php';
    return this.http.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  

  getId(id,file): Observable<any>{
    return this.http.get(`${this.apiUrl}`+file+'.php?id='+`${id}`);
  }
  
  put(data,file): Observable<any> {
    let API_URL = `${this.apiUrl}`+file+'.php';
    return this.http.put(API_URL,data)
      .pipe(
        catchError(this.error)
      )
  }



  verifyUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}/verify.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  addUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}/register.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  updPhotoUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}/cover.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  addItems(data): Observable<any> {
    let API_URL = `${this.apiUrl}/additems.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  getCinfo(data):Observable<any> {
    let API_URL = `${this.apiUrl}/getinfo.php`;
    return this.http.post(API_URL,data)
      .pipe(
        catchError(this.error)
      )
  }

  updateUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}/edituser.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  closeday(data): Observable<any> {
    let API_URL = `${this.apiUrl}/closeday.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  

  addCashout(data): Observable<any> {
    let API_URL = `${this.apiUrl}/cashout.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  getItems(): Observable<any> {
    let API_URL = `${this.apiUrl}/getitems.php`;
    return this.http.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  getDItems(): Observable<any> {
    let API_URL = `${this.apiUrl}/getditems.php`;
    return this.http.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  getdailies(): Observable<any> {
    let API_URL = `${this.apiUrl}/dailies.php`;
    return this.http.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  addsales(data): Observable<any> {
    let API_URL = `${this.apiUrl}/sellitem.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  getsales(): Observable<any> {
    let API_URL = `${this.apiUrl}/loadsales.php`;
    return this.http.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  addexpense(data): Observable<any> {
    let API_URL = `${this.apiUrl}/expenses.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  setup(data): Observable<any> {
    let API_URL = `${this.apiUrl}/setup.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  productkey(data): Observable<any> {
    let API_URL = `${this.apiUrl}/productkey.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }


  deleteItem(data): Observable<any> {
    let API_URL = `${this.apiUrl}/delete_item.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  returnItem(data): Observable<any> {
    let API_URL = `${this.apiUrl}/return.php`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  getUsers(): Observable<any> {
    let API_URL = `${this.apiUrl}/getUsers.php`;
    return this.http.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  getsingleitem(itemnum): Observable<any>{
    let API_URL = `${this.apiUrl}/singleitem.php`;
    return this.http.post(API_URL, itemnum)
      .pipe(
        catchError(this.error)
      )
  }

  getcustomer(id): Observable<any>{
    return this.http.get(`${this.apiUrl}/loadsinglecustomer.php?id=${id}`,id);
  }


  
  // Handle Errors 
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
