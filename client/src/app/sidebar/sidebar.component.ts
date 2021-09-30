import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/services/communication/communication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void { }

  startMission(): void {
    this.communicationService.startMission("ARGOS" || "CRAZYFLIE");
  }

  endMission(): void {
    this.communicationService.endMission("ARGOS" || "CRAZYFLIE");
  }

  returnToBase(): void {
    this.communicationService.returnToBase("ARGOS" || "CRAZYFLIE");
  }

}
