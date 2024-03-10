// TODO implement a better logger
// research best practice for next
// import { IS_PROD } from '@/constants'

class Logger {
    error(message: string, ...more: string[]): void {
        // TODO to some external service
        this.debug(message, ...more)
    }

    warn(message: string, ...more: string[]): void {
        // TODO to some external service
        this.debug(message, ...more)
    }

    info(message: string, ...more: string[]): void {
        // TODO to some external service
        this.debug(message, ...more)
    }

    debug(message: string, ...more: string[]): void {
        this.logLocally(message, ...more)
    }

    logLocally(message: string, ...more: string[]) {
        console.log(message, ...more)
    }
}

const LoggerInstance = new Logger()

export { LoggerInstance as AppLogger }
