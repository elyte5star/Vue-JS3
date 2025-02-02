import pino from 'pino';
import type { TransportTargetOptions } from 'pino';

const transport:TransportTargetOptions ={
    target:'pino-pretty',
    options:{
        colorize:true,
        translateTime: "UTC:dd-mm-yyyy'T'HH:MM:SS",
        ignore:'pid,hostname'
    }
}

const logger = pino({transport});

export default logger;