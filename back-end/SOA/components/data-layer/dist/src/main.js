"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: [
            "https://askmeanything-soa-quest-man.herokuapp.com",
            "https://askmeanything-soa-authenticate.herokuapp.com",
            "https://askmeanything-soa-quest-run.herokuapp.com",
            "https://askmeanything-soa-anals-stats.herokuapp.com",
        ],
    });
    await app.listen(process.env.PORT || 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map