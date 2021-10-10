export interface Drone {
    number: number;
    state: 'Waiting' | 'Start-Up' | 'Exploring' | 'ReturnToBase' | 'ImmediateLanding' | 'Crashed';
    position: [number, number, number];
    batteryLvl: number;
}
