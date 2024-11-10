import { Component } from '@angular/core';
import { FormBuilder, ɵNgNoValidate } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  acno:any
  dt:any
  user = ''

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.dt=new Date()
    //access username
    this.user = JSON.parse(localStorage.getItem ('currentuser')|| '')
  }

  depositform = this.fb.group({ acno: [''], psw: [''], amnt: [''] })
  withdrawform = this.fb.group({ acc: [''], ps: [''], wit: [''] })


  ngOnInit(): void {
    // if (!localStorage.getItem('currentacno')) {
    //   alert('Please login first')
    //   this.router.navigateByUrl('')
    // }
  }


  deposit() {
    var acno = this.depositform.value.acno
    var psw = this.depositform.value.psw
    var amnt = this.depositform.value.amnt

    this.ds.deposit(acno, psw, amnt).subscribe((result:any)=>{ // callin the function in DataService

    if (result) {
      alert(`${amnt} credited to your account, Balance is ${result.message}`)
    }
  }, 
    (result:any)=>{
      alert(result.error.message)
    }
)
}

  withdraw() {
    var acc = this.withdrawform.value.acc
    var ps = this.withdrawform.value.ps
    var wit = this.withdrawform.value.wit

    this.ds.withdraw(acc, ps, wit).subscribe((result:any)=>{
      if (result) {
        alert(`${wit} is debited, Balance is ${result.message}`)
      }
    },
    (result:any)=>{
      alert(result.error.message)
    })

   
  }

  logout() {
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacno')
    this.router.navigateByUrl('')
  }

  deleteconfirm(){
    this.acno=JSON.parse( localStorage.getItem('currentacno') || '')
  }

    oncancel(){
      this.acno=""
    }

    delete(event:any){
      this.ds.deleteacc(event).subscribe((result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      })
    }
}




