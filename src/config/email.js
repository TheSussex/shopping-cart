import 'dotenv/config';
import sgMail from '@sendgrid/mail';
import config from './setup';

sgMail.setApiKey(config.SENDGRID_API_KEY);

export default sgMail;
