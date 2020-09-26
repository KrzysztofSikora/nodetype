/* tslint:disable:ter-indent */
import { NextFunction, Request, Response } from 'express';

// tslint:disable-next-line:no-var-requires
const exec = require('child_process').exec;
// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-var-requires
const spawn = require('child_process').spawn;

// tslint:disable-next-line:no-var-requires
const readLine = require('@serialport/parser-readline');

// tslint:disable-next-line:no-var-requires
const serialPort = require('serialport');
const arduinoCOMPort = '/dev/ttyUSB0';
const arduinoSerialPort = new serialPort(arduinoCOMPort, {
    baudRate: 9600,
});
// sudo chmod 666 /dev/ttyACM0
// tslint:disable-next-line:only-arrow-functions
const cameraScriptPath = '/home/pi/nodetype/src/camera.py';

arduinoSerialPort.on('open',  ()  => {
    console.log('Serial Porrt ' + arduinoCOMPort + ' is opened.');
});

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    public left = (req: Request, res: Response, next: NextFunction) => {
        try {
            const pythonProcess = spawn('python3', [cameraScriptPath, 24, 25, 8, 7, 0.001, 'LEFT']);
            res.status(200).json({ data: { test: 'left' }, message: 'findAll' });

        } catch (error) {
            next(error);
        }
    }

    public up = (req: Request, res: Response, next: NextFunction) => {
        try {
            const pythonProcess = spawn('python3', [cameraScriptPath, 12, 16, 20, 21, 0.001, 'RIGHT']);
            res.status(200).json({ data: { test: 'up' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public right = (req: Request, res: Response, next: NextFunction) => {
        try {
            const pythonProcess = spawn('python3', [cameraScriptPath, 24, 25, 8, 7, 0.001, 'RIGHT']);
            res.status(200).json({ data: { test: 'right' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public down = (req: Request, res: Response, next: NextFunction) => {
        try {

            const pythonProcess = spawn('python3', [cameraScriptPath, 12, 16, 20, 21, 0.001, 'LEFT']);
            res.status(200).json({ data: { test: 'down' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public stop = (req: Request, res: Response, next: NextFunction) => {
        try {
            arduinoSerialPort.write('s');
            res.status(200).json({ data: { test: 'stop' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public allForward = (req: Request, res: Response, next: NextFunction) => {
        try {
            arduinoSerialPort.write('f');
            res.status(200).json({ data: { test: 'all forward' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public allStop = (req: Request, res: Response, next: NextFunction) => {
        try {
            arduinoSerialPort.write('s');
            res.status(200).json({ data: { test: 'all stop' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public allBackward = (req: Request, res: Response, next: NextFunction) => {
        try {
            arduinoSerialPort.write('b');
            res.status(200).json({ data: { test: 'all backward' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public turnRight = (req: Request, res: Response, next: NextFunction) => {
        try {
            arduinoSerialPort.write('a');
            res.status(200).json({ data: { test: 'turn right' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public turnLeft = (req: Request, res: Response, next: NextFunction) => {
        try {
            arduinoSerialPort.write('p');
            res.status(200).json({ data: { test: 'turn left' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public systemOff = (req: Request, res: Response, next: NextFunction) => {
        try {

            // arduinoSerialPort.write("o");
            //  exec('sudo <password> |  shutdown now', function (msg: string) { console.log(msg) });
            res.status(200).json({ data: { test: 'system off' }, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public power = (req: Request, res: Response, next: NextFunction) => {
        try {
            const parser = arduinoSerialPort.pipe(new readLine({ delimiter: '\r\n' }));
            parser.on('data', (data: any) => {
                console.log('read');
                console.log(data.split(','));
                res.status(200).json({ data: data.split(','), message: 'power' });
                parser.destroy();
            });
        } catch (error) {
            next(error);
        }
    }
}

export default IndexController;
