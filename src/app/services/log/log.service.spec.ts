import { TestBed } from '@angular/core/testing';
import { MissionTimestamp } from 'src/app/tools/interfaces';
import { LogService } from './log.service';

describe('LogService', () => {
    let service: LogService;
    let stamp: MissionTimestamp = {
        date: '2021-12-5',
        time: '09:19:24',
        date_time: '[2021-12-5]        09:19:24        ',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should convert ms to time', () => {
        let msTime: number = 51000000;
        service.msToTime(msTime);
        expect(service.msToTime(msTime)).toEqual('14:10:00');
    });

    it('should format time', () => {
        let date: Date = new Date('Sun, 05 Dec 2021 14:19:24 UTC');
        let timestamp: string = date.toUTCString();
        service.formatTimestamp(timestamp);
        expect(service.formatTimestamp(timestamp)).toEqual(stamp);
    });
});
