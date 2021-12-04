import { OverlayModule } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from '@backend/api-client';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/components/app/app.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { DroneContainerComponent } from './app/components/dashboard/drone-container/drone-container.component';
import { DronePulseComponent } from './app/components/dashboard/drone-container/drone/drone-pulse/drone-pulse.component';
import { DroneComponent } from './app/components/dashboard/drone-container/drone/drone.component';
import { PercentageBarComponent } from './app/components/dashboard/drone-container/drone/percentage-bar/percentage-bar.component';
import { LogComponent } from './app/components/dashboard/log/log.component';
import { MapContainerComponent } from './app/components/dashboard/map-container/map-container.component';
import { MapComponent } from './app/components/dashboard/map-container/map/map.component';
import { HistoryComponent } from './app/components/dialog-boxes/history/history.component';
import { InformationComponent } from './app/components/dialog-boxes/information/information.component';
import { SidebarComponent } from './app/components/sidebar/sidebar.component';
import { TopNavComponent } from './app/components/top-nav/top-nav.component';
registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        DroneComponent,
        DroneContainerComponent,
        DashboardComponent,
        TopNavComponent,
        LogComponent,
        MapComponent,
        MapContainerComponent,
        PercentageBarComponent,
        InformationComponent,
        HistoryComponent,
        DronePulseComponent,
    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NzSelectModule,
        ApiModule,
        NzMenuModule,
        NzLayoutModule,
        NzButtonModule,
        NzIconModule,
        NzDividerModule,
        NzListModule,
        NzSwitchModule,
        NzSpinModule,
        NzDropDownModule,
        NzAlertModule,
        NzModalModule,
        NzTableModule,
        NzInputModule,
        NzInputNumberModule,
        NzSliderModule,
        NzGridModule,
        OverlayModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }, HttpClientModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
