import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from '@backend/api-client';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/components/app/app.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { DroneContainerComponent } from './app/components/drone-container/drone-container.component';
import { DroneComponent } from './app/components/drone/drone.component';
import { MissionComponent } from './app/components/mission/mission.component';
import { SidebarComponent } from './app/components/sidebar/sidebar.component';
import { TopNavComponent } from './app/components/top-nav/top-nav.component';
import { LogComponent } from './app/components/log/log.component';
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
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }, HttpClientModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
