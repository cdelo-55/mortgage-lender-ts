import LoanApplication from "./LoanApplication";
import {LoanStatus} from "./LoanStatus";


export default class MortgageLender {
    availableFunds:number = 0;
    //private _addAmt: number = 0;
    isQualified: boolean = false;
    pendingFunds: number = 0;
     
    constructor() {
    }

    // set addAmt(value: number){
    //    this._addAmt = value;
    // }
    // get addAmt() {
    //   console.log(this._addAmt);
    //   return this._addAmt;
    // }
           
    addFunds(amt: number): number {
      //console.log(this._addAmt);  
      this.availableFunds += amt;
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
        pendingApp.savings >= pendingApp.loanAmount * 0.25 ) {
        pendingApp.isQualified = true; // changed this
    } else {
      pendingApp.isQualified = false; // changed this
    }
    return pendingApp.isQualified; // changed
  }

  // sendOffer(pendingApp:LoanApplication): void {
  //   if (pendingApp.approve) {
  //     this.pendingFunds += pendingApp.loanAmount;
  //     this.availableFunds -= pendingApp.loanAmount;
  //     pendingApp.loanStatus = LoanStatus.Pending;
  //   }
  // }

  sendOffer(loanApp:LoanApplication): void {
    loanApp.loanStatus = LoanStatus.Pending;
    this.pendingFunds += loanApp.loanAmount;
    this.availableFunds -= loanApp.loanAmount;
  }
  
  // Release Offer - receive response for loan offers, so that I can update the status of pending loans.
  releaseOffer(loanApp:LoanApplication): void {
   
    if (loanApp.loanStatus === LoanStatus.Accepted) {
      this.pendingFunds -= loanApp.loanAmount;
    } else { 
      if (loanApp.loanStatus === LoanStatus.Rejected) {
      this.pendingFunds -= loanApp.loanAmount; 
      this.availableFunds += loanApp.loanAmount;
      } 
    }
     
  }
}

