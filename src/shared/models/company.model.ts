export class Company {
    id: string;
    companyName: string;
    companyAddress: string;
    contactPerson: string;
    telephone: string;
    webAddress: string;
    maximumNumberOfGuest: number;
    smsQuota: number;
    perMonthValue: number;
    balance: number;

    constructor(
        companyName?: string,
        companyAddress?: string,
        contactPerson?: string,
        telephone?: string,
        webAddress?: string,
        maximumNumberOfGuest?: number,
        smsQuota?: number,
        perMonthValue?: number,
        balance?: number
    ) { }

}
