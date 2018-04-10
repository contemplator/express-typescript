export class RegisterNotification {
    public touser: string;
    public template_id: string = 'kxXTsYWugS1eBvGWuGyveaFk_fH35vktGQWUFqZHASM';
    public form_id: string;
    public data: any;

    constructor(
        touser: string,
        formId: string,
        visitOrder: number,
        patientName: string,
        visitTime: string,
        doctorName: string,
        clinicAddress: string,
        recordId: string,
        symptoms: string,
        price: string,
        remind?: string
    ) {
        this.touser = touser;
        this.form_id = formId;
        this.data = {
            keyword1: { value: visitOrder },
            keyword2: { value: patientName },
            keyword3: { value: visitTime },
            keyword4: { value: doctorName },
            keyword5: { value: clinicAddress },
            keyword6: { value: recordId },
            keyword7: { value: symptoms },
            keyword8: { value: price },
            keyword9: { value: remind || '若要使用醫保請在報到時出示醫保卡' },
        }
    }
}