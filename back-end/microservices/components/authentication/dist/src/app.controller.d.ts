import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { ChoreoObjectDto } from './choreoObject.dto';
export declare class AppController {
    private authService;
    private appService;
    constructor(authService: AuthService, appService: AppService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getHello(): string;
    choreoHandle(body: ChoreoObjectDto): Promise<any>;
}
