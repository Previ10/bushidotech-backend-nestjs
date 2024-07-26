import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
//utilizamos un provider para iniciar la verificacion de nuestro jwt
//servicio
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(

        ConfigService: ConfigService

    ){
        super({
           secretOrKey: ConfigService.get('JWT_SECRET'),
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload:any): Promise<User>{

            console.log({payload})



            throw new UnauthorizedException('invalid token :(')
    }


}