export interface FormData {
    statusIndicatorLights: string[],
    deviceSerialNumber: string,
    userId: number,
    problemDescription: string
}

export interface ValidationErrors {
    deviceSerialNumber: string,
    userId: string,
}

export type ResponseProcessor = (deviceSerialNumber: string) => string
