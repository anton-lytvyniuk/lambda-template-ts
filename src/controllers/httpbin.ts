import { Response } from 'express';

import { IRequest } from '../interface';

/* eslint-disable import/prefer-default-export */

export function get(req: IRequest, res: Response) {
  res.send();
}
