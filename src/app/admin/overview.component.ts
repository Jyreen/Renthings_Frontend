import { Component, OnInit, Renderer2} from '@angular/core';
import { AccountService } from '../_services';
import { CalendarOptions } from '@fullcalendar/core'; // FullCalendar types
import dayGridPlugin from '@fullcalendar/daygrid'; // DayGrid plugin
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  
}