import 'dotenv/config'
import {get} from 'env-var'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DISCORT_WEBHOOK_URL: get('DISCORT_WEBHOOK_URL').required().asString(),
    SECRET_TOKEN: get('SECRET_TOKEN').required().asString()
}