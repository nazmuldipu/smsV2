export class Group {
    id: string;
    companyId: string;
    serialNo: number;
    groupCode: string;
    institution: string;
    numberOfGuest: string;

    constructor(
        companyId?: string,
        serialNo?: number,
        groupCode?: string,
        institution?: string,
        numberOfGuest?: string,
    ) { }

}
