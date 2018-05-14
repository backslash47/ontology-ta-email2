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
import { generateClaim } from '../services/claim.generator';

const router: Router = Router();

router.get('/:request', async (req: Request, res: Response) => {
    const param = req.params.request;
    const request = OntRequest.deserialize(param);

    // verifies if the challenge issuer is TA
    if (request.metadata.issuer !== config.ont.id) {
        console.log('Wrong issuer.');
        res.sendStatus(403);
    }

    // verifies the challenge signature
    const verifyResult = await request.verify(CONST.TEST_ONT_URL.REST_URL);
    if (!verifyResult) {
        console.log('Wrong signature.');
        res.sendStatus(403);
    }

    // generates and attests claim
    const claim = await generateClaim(request.metadata.subject, request.data.email);
    
    // returns the verified claim to user
    res.set({"Content-Disposition":"attachment; filename=\"claim.jwt\""});
    res.setHeader('Content-type', 'application/octet-stream');
    res.send(claim);
});

export const ChallengeControler: Router = router;
