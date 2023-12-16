import type { ResponseProcessor } from "../types";

export class ResponseProcessorHandler {
    private handlers: Record<string, ResponseProcessor> = {};

    addHandler(prefix: string, handler: ResponseProcessor): void {
        this.handlers[prefix] = handler;
    }

    process(deviceSerialNumber: string): string {
        for(const prefix in this.handlers) if (deviceSerialNumber.startsWith(prefix)) {
            return this.handlers[prefix](deviceSerialNumber);
        }
        return "Unknown issue";
    }
}