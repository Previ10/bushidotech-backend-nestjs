import { TEMPLATES } from "./all-templates";
import * as fs from 'fs'
import Handlebars from "handlebars";

export interface paramsEmail {
    type: string;
    data: any;
}

const CHARSET = 'utf8'

export const renderTemplate = ({ type, data } : paramsEmail): string => {
    const pathTemplate: string = TEMPLATES[type]
    const tem = fs.readFileSync(pathTemplate, CHARSET);
    const compiledTemplate = Handlebars.compile(tem);
    return compiledTemplate(data);
}
