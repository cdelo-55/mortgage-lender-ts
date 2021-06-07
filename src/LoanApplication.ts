import {LoanStatus} from "./LoanStatus";
export default class LoanApplication  {
    loanAmount:number = 0;
    approve: boolean = false;
    dti:number = 0
    isQualified: boolean = false;
    creditScore:number;
    savings:number;
    loanStatus : LoanStatus;
   
    constructor(
        loanAmount: number,
        dti: number,
        creditScore: number,
        savings: number   
    ) { 
        this.loanAmount = loanAmount;
        this.savings = savings;
        this.dti = dti;
        this.creditScore = creditScore;
    } 
   
    // get loanAmount() {
    //     console.log(this._loanAmount);
    //     return this._loanAmount;
    // }

    // set loanAmount(loanAmount: number){
    //     this._loanAmount = loanAmount;
    // }        
    
    isApproved(): boolean {
        return this.approve;
    }
     
}