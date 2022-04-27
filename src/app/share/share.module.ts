import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChartsComponent } from './charts/charts.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CircleEchartsComponent } from './circle-echarts/circle-echarts.component';
import { LineEchartsComponent } from './line-echarts/line-echarts.component';
import { HomeCalendarComponent } from './home-calendar/home-calendar.component';
import { HomeChartsEchartsComponent } from './home-charts-echarts/home-charts-echarts.component';
import { HomeCalendarDayDetailComponent } from './home-calendar-day-detail/home-calendar-day-detail.component';
import { EditAddItemsComponent } from './edit-add-items/edit-add-items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FullCalendarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [
    DatePickerRangeComponent,
    CalendarComponent,
    ChartsComponent,
    LineEchartsComponent,
    CircleEchartsComponent,
    HomeChartsEchartsComponent,
    HomeCalendarComponent,
    HomeCalendarDayDetailComponent,
    EditAddItemsComponent,
    ItemDetailComponent
  ],
  exports:[
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    DatePickerRangeComponent,
    FullCalendarModule,
    CalendarComponent,
    ChartsComponent,
    LineEchartsComponent,
    CircleEchartsComponent,
    HomeChartsEchartsComponent,
    HomeCalendarComponent,
    HomeCalendarDayDetailComponent,
    EditAddItemsComponent,
    ItemDetailComponent
  ]
})
export class ShareModule { }

