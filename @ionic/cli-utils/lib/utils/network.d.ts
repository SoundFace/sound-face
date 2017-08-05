export declare function getAvailableIPAddress(): any[];
export declare function findClosestOpenPort(host: string, port: number): Promise<number>;
export declare function isPortTaken(host: string, port: number): Promise<boolean>;
