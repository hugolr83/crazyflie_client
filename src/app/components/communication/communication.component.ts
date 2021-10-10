import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/communication/socket.service';

@Component({
    selector: 'communication-component',
    templateUrl: './communication.component.html',
    styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {

    constructor(public socketService: SocketService) { }

    ngOnInit() { }

}
