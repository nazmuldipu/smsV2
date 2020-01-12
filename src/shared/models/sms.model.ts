export class SMS {
    constructor(
        public id?: string,
        public date?: Date,
        public companyId?: string,
        public userId?: string,
        public phone?: string,
        public message?: string,
        public notes?: string,
    ) { }
}
