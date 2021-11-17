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
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/components/app/app.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { DroneContainerComponent } from './app/components/drone-container/drone-container.component';
import { DroneComponent } from './app/components/drone/drone.component';
import { LogComponent } from './app/components/log/log.component';
import { MapContainerComponent } from './app/components/map-container/map-container.component';
import { MapComponent } from './app/components/map/map.component';
import { MissionComponent } from './app/components/mission/mission.component';
import { PercentageBarComponent } from './app/components/percentage-bar/percentage-bar.component';
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
        MissionComponent,
        LogComponent,
        MapComponent,
        MapContainerComponent,
        PercentageBarComponent,
    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ApiModule,
        NzMenuModule,
        NzLayoutModule,
        NzButtonModule,
        NzIconModule,
        NzDividerModule,
        NzListModule,
        NzDropDownModule,
        NzAlertModule,
        NzModalModule,
        NzInputModule,
        NzInputNumberModule,
        NzSliderModule,
        NzGridModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }, HttpClientModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
