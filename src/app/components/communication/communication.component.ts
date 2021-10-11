import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/communication/socket.service';

@Component({
    selector: 'app-communication',
    templateUrl: './communication.component.html',
    styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent {

    constructor(public socketService: SocketService) { }

}
