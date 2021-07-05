import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private manager;
    private jwtService;
    constructor(manager: EntityManager, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
