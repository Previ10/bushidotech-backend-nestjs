import * as dotenv from 'dotenv'
import { TEMPLATE_WELCOME } from './all-templates'

dotenv.config()

export const DATA_EMAIL : any = {
    [TEMPLATE_WELCOME]: {
        from: `${process.env.USER_EMAIL_SEND}`,
        to: '',
        subject: "¡Bienvenido a Bushido Tech!",
        html: ''
    },
    // [TEMPLATE_RESET_PASSWORD]: {
    //     from: `${process.env.USER_EMAIL_SEND}`,
    //     to: '',
    //     subject: 'Reseteo de contraseña',
    //     html: ''
    // },
}
