export class TransactionResponse {
    id!: string;
    customerId!: string;
    customerName!: string;
    amount!: Number;
    type!: string;
    idBankSource!: string;
    idBankTarget!: string;
    transactionDate!: Date;
    content!: string;
}
