import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get } from '@decorators/express';

@Controller('/user')
export class UsersController {

    @Get('/')
    getData( req: Request, res: Response) {
        res.send({
            id: 1,
            name: 'Leo'
        });
    }

    @Get('/:id')
    getUser( req: Request, res: Response) {
        res.send({
            id: req.params.id,
            name: 'Leo'
        });
    }
}
