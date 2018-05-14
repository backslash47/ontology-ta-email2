/*
 * Copyright (C) 2018 Matus Zamborsky
 * This file is part of The ONT Detective.
 *
 * The ONT Detective is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ONT Detective is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ONT Detective.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Router, Request, Response } from 'express';
import { Request as OntRequest, CONST} from 'ont-sdk-ts';
import config from '../config';
import { sendMail } from '../services/sender';
import { generateChallenge } from '../services/challenge.generator';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    const request = OntRequest.deserialize(body);

    // verifies if the request subject is TA
    if (request.metadata.subject !== config.ont.id) {
        console.log('Wrong subject.');
        res.sendStatus(403);
    }

    // verifies the request signature
    const verifyResult = await request.verify(CONST.TEST_ONT_URL.REST_URL);
    if (!verifyResult) {
        console.log('Wrong signature.');
        res.sendStatus(403);
    }
    
    
    // generates challenge
    const ontId = request.metadata.issuer;
    const email = request.data.email;
    const challenge = await generateChallenge(ontId, email);
    
    // creates and sends mail to user
    const url = config.app.url + '/challenge/' + challenge;
    await sendMail('noreply@ontdetective.org', email, 'Verify your email', url);

    res.send('Email challenge was sent.');
});

export const EmailRequestController: Router = router;
