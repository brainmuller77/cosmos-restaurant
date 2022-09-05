import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() orders:number
  @Input() customers:number
  @Input() complain:number
  @Input() suggest:number
  @Input() totalsales:number
  @Input() salestoday:number
  @Input() topheader:string
  @Input() altheader:string
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newEvent = new EventEmitter<string>();
  @Output() suggestEvent = new EventEmitter<string>();
  @Output() complainEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
  openorderspage(){
    this.newItemEvent.emit("hi");
  }
  opencustomerspage(){
    this.newEvent.emit("hi");
  }
  opensuggestionpage(){
    this.suggestEvent.emit("hi");
  }

  opencomplainpage(){
    this.complainEvent.emit("hi");
  }
}
