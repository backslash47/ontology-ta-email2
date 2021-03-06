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

import nodemailer, { SentMessageInfo } from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.mail.user,
        pass: config.mail.password
    }
});

/**
 * Sends email to user.
 * 
 * @param from From
 * @param to To
 * @param subject Email subject
 * @param text Email body
 */
export async function sendMail(from: string, to: string, subject: string, text: string): Promise<SentMessageInfo> {
    // send some mail
    return transporter.sendMail({
        from,
        to,
        subject,
        text,
    }, (err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
    });
}
