import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  currentDate?: any;
  
  weekDaysHeaderArr: any = [];
  gridArr: any = [];
  
  selectedDate?: any;
  show?: boolean;

  @ViewChild('calendar', {static: true}) calendar: any;

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    moment.locale('es', {
      months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
      weekdaysShort : 'do_lu_ma_mi_ju_vi_sa'.split('_'),
      dow: 0
    });
    this.currentDate = moment();
    this.makeHeader();
    this.makeGrid();
  }

  makeHeader(){
    const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
    weekDaysArr.forEach(day => this.weekDaysHeaderArr.push(moment().weekday(day).format('ddd')));
  }

  makeGrid() {
    var range = require('lodash.range');
    const firstOfMonth = moment(this.currentDate).startOf('month').day();
    const lastOfMonth = moment(this.currentDate).endOf('month').day();
    
    const firstDayOfGrid = moment(this.currentDate).startOf('month').subtract(firstOfMonth, 'days');
    const lastDayOfGrid = moment(this.currentDate).endOf('month').subtract(lastOfMonth, 'days').add(7, 'days');
    const startCalendar = firstDayOfGrid.date();
    
    let r = range(startCalendar, startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days')).map((date: any) => {
      const newDate = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        day: newDate.date(),
      };
    });

    console.log('Range', r);
  }

  private isToday(date: any): boolean {
    return moment().isSame(moment(date), 'day');
  }

  private isSelected(date: any): boolean {
    return this.selectedDate === moment(date).format('DD/MM/YYYY');
  }
  
}
