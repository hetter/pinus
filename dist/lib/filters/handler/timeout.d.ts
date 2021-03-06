export default function (timeout: any, maxSize: any): TimeoutFilter;
export declare class TimeoutFilter {
    private timeout;
    private maxSize;
    timeouts: {};
    curId: number;
    constructor(timeout: number, maxSize: number);
    before(routeRecord: any, msg: any, session: any, next: any): void;
    after(err: any, routeRecord: any, msg: any, session: any, resp: any, next: any): void;
}
