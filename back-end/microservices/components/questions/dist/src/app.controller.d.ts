import { AppService } from './app.service';
import { ChoreoObjectDto } from './choreoObject.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    choreoHandle(body: ChoreoObjectDto): Promise<any>;
}
