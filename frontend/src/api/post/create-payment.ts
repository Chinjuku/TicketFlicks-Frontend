import { savePaymentTypes } from '@/types/payment';
import { tryCatchPostMethod } from '@/utils/api-helper';

export const savePayment = async (savePaymentData : savePaymentTypes) => {
    return await tryCatchPostMethod("/payment/", savePaymentData);
}