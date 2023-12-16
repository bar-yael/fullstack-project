import { ResponseProcessorHandler } from './response_processor';
import type { FormData } from "../types";

export class HandleResponse {
    private responseProcessor: ResponseProcessorHandler = new ResponseProcessorHandler();

    calculateUserResponse(formData: FormData): string {
        this.setHandlers(formData.statusIndicatorLights);
        return this.responseProcessor.process(formData.deviceSerialNumber);
    }

    private setHandlers(statusIndicatorLights: string[]) {
        this.responseProcessor.addHandler('24-X', deviceSerialNumber => {
            return this.startsWith24()
        });
        this.responseProcessor.addHandler('36-X', deviceSerialNumber => {
            return this.startsWith36(statusIndicatorLights)
        });
        this.responseProcessor.addHandler('51-B', deviceSerialNumber => {
            return this.startsWith51(statusIndicatorLights)
        });
    }


    private startsWith24(): string {
        return 'please update your device';
    }

    private startsWith36(statusIndicatorLights: string[]): string {
        if (statusIndicatorLights.every(status => status === 'off')) {
            return 'turn on the device';
        }
        if (statusIndicatorLights.every(status => status === 'on')) {
            return 'ALL is ok';
        }
        if (statusIndicatorLights.filter(status => status === 'blinking').length === 2) {
            return 'please wait';
        }
        return 'Unknown issue';
    }

    private startsWith51(statusIndicatorLights: string[]): string {
        if (statusIndicatorLights.every(status => status === 'off')) {
            return 'turn on the device';
        }
        if (statusIndicatorLights.filter(status => status === 'blinking').length > 0) {
            return 'please wait';
        }
        const onCount = statusIndicatorLights.filter(status => status === 'on').length;
        const offCount = statusIndicatorLights.filter(status => status === 'off').length;
        if (onCount > 1 && onCount + offCount === statusIndicatorLights.length) {
            return 'ALL is ok';
        }
        return 'Unknown issue';
    }
}