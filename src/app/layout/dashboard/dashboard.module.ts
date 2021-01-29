import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { SharedPipesModule, StatModule } from '../../shared';
import { DateLocaleFilterPipe } from '../../shared/pipes/date-locale-filter.pipe';
import { ChatComponent, NotificationComponent, TimelineComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        ChartsModule,
        TranslateModule,
        SharedPipesModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ],
    providers: [
        DateLocaleFilterPipe
    ]
})
export class DashboardModule { }
