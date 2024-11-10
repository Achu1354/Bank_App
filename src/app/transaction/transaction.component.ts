import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})



export class TransactionComponent {
  acno: any
  transaction: any

  constructor(private ds: DataService) {
    this.acno = JSON.parse(localStorage.getItem('currentacno') || " ")
    this.ds.gettransaction(this.acno).subscribe((result: any) => {
      this.transaction = result.message
      console.log(this.transaction);
    },
      (result: any) => {
        alert(result.error.message)

      })

    // console.log(this.transaction);
  }

  logout() {
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacno')
    // this.router.navigateByUrl('')
  }
}
