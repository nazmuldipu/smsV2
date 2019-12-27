export class People {
    id: string;
    companyId: string;
    groupId: string;
    serialNo: number;
    name: string;
    phone: string;
    email: string;

    constructor(
        companyId?: string,
        groupId?: string,
        serialNo?: number,
        name?: string,
        phone?: string,
        email?: string,
    ) { }
}
