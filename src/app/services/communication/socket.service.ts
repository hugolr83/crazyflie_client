import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    isConnected: boolean = false;

    constructor() { }

}
