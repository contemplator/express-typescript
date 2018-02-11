import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';

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
            id: parseInt(req.params.id),
            name: 'Leo'
        });
    }

    @Post('/info')
    getUserInfo( req: Request, res: Response) {
        let id = req.body.id;
        let attribute = req.body.attr;
        res.send(req.body);
    }
}
