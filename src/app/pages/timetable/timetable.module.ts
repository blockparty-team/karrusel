import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetablePage } from './timetable.page';

import { TimetablePageRoutingModule } from './timetable-routing.module';
import { TimetableGanttComponent } from './timetable-gantt/timetable-gantt.component';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { FilterEventsModule } from '@app/shared/components/filter-events/filter-events.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TimetablePageRoutingModule,
    FilterEventsModule
  ],
  declarations: [
    TimetablePage, 
    TimetableGanttComponent,
    TimetableListComponent
  ]
})
export class TimetablePageModule {}
