import LoanApplication from "./LoanApplication";
import {LoanStatus} from "./LoanStatus";


export default class MortgageLender {
    availableFunds:number = 0;
    private _addFunds: number = 0;
    isQualified: boolean = false;
    pendingFunds: number = 0;
     
    constructor() {

    }

    get addAmt() {
        console.log(this._addFunds);
        return this._addFunds;
    }

    set addAmt(depositAmt: number){
        this._addFunds = depositAmt;
    }
            
    addFunds(_addFunds: number): number {
      console.log(this._addFunds);  
      this.availableFunds += this._addFunds;
      return this.availableFunds;
    }
    
    // keep pending loan amounts in a separate account
    // so I don't extend too many offers
    approve(pendingApp:LoanApplication): boolean {
      if (pendingApp.loanAmount <= this.availableFunds - this.pendingFunds) {
          pendingApp.loanStatus = LoanStatus.Approved;
          pendingApp.approve = true;
      } else {
        pendingApp.approve = false;
        pendingApp.loanStatus = LoanStatus.Rejected;
      }
      return pendingApp.approve;
    }

    // Qualifying candidates must have debt-to-income (DTI) less than 36%, 
    // credit score above 620 and savings worth 25% of requested loan amount.

  reviewApplication(pendingApp:LoanApplication): boolean {
    if (pendingApp.dti < 36 && pendingApp.creditScore > 620 && 
        pendingApp.savings >= pendingApp.loanAmount * .25 ) {
        this.isQualified = true;
    } else {
      this.isQualified = false;
    }
    return this.isQualified;
  }

  sendOffer(pendingApp:LoanApplication): void {
     if (pendingApp.approve) {
       this.pendingFunds += pendingApp.loanAmount;
       this.availableFunds -= pendingApp.loanAmount;
       pendingApp.loanStatus = LoanStatus.Pending;
     }
  }

  
  // Release Offer - receive response for loan offers, so that I can update the status of pending loans.
  releaseOffer(pendingApp:LoanApplication): void {
    // if (pendingApp.loanStatus === "Accepted") {
    //     this.
    // }
  }
};

