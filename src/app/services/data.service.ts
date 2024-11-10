import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const option = {
  // Global overloading headers
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

//all the logic related with this database will be created and partially declared here , like the methods/function
//and along will declare arguments and its type, alwys the type has to be mentioned along with the variable


export class DataService {

  userDetails: any
  currentuser = ' '
  currentacno = ' '

  constructor(private http: HttpClient) {

  }

  savedetails() {
    if (this.userDetails) {
      localStorage.setItem("database", JSON.stringify(this.userDetails))
    }
    if (this.currentuser) {
      localStorage.setItem("currentuser", JSON.stringify(this.currentuser))
    }
    if (this.currentacno) {
      localStorage.setItem("currentacno", JSON.stringify(this.currentacno))
    }
  }

  // getdetails() {
  //   if (localStorage.getItem('database')) {
  //     this.userDetails = JSON.parse(localStorage.getItem('database') || '')
  //   }
  //   if (localStorage.getItem('currentuser')) {
  //     this.currentuser = JSON.parse(localStorage.getItem('currentuser') || '')
  //   }
  //   if (localStorage.getItem('currentacno')) {
  //     this.currentacno = JSON.parse(localStorage.getItem('currentacno') || '')
  //   }
  // }



  // userDetails: any = {
  //   1001: { acno: 1001, username: "anju", password: 1231, balance: 0 ,transaction:[]},
  //   1002: { acno: 1002, username: "amal", password: 1232, balance: 0,transaction:[] },
  //   1003: { acno: 1003, username: "arun", password: 1233, balance: 0,transaction:[] },
  //   1004: { acno: 1004, username: "mega", password: 1234, balance: 0 ,transaction:[]}
  // }

  gettoken() {
    const token = JSON.parse(localStorage.getItem('token') || '')

    let headers = new HttpHeaders()

    if (token) {
      option.headers = headers.append('access-token', token)
    }

    return option
  }


  register(acno: any, uname: any, psw: any) {

    const data = {
      acno, uname, psw
    }
    return this.http.post('http://localhost:3000/register', data)

  }

  login(acno: any, psw: any) {
    const data = {
      acno, psw
    }

    return this.http.post('http://localhost:3000/login', data)

  }

  deposit(acno: any, password: any, amount: any) {
    const data = {
      acno, psw: password, amount
    }
    return this.http.post('http://localhost:3000/deposit', data, this.gettoken())
  }

  withdraw(acno: any, password: any, amount: any) {
    const data = {
      acno, psw: password, amount
    }
    return this.http.post('http://localhost:3000/withdraw', data, this.gettoken())

    // var userDetails = this.userDetails
    // var wit = parseInt(amount)
    // if (acno in userDetails) {
    //   if (password == userDetails[acno]["password"]) {
    //     if (wit <= userDetails[acno]["balance"]) {
    //       userDetails[acno]["balance"] -= wit
    //       userDetails[acno]["transaction"].push({ type: 'DEBIT', amount: wit })
    //       this.savedetails()
    //       return userDetails[acno]["balance"]
    //     } else {
    //       alert('Insufficient balance')
    //       return false
    //     }
    //   } else {
    //     alert('Incorrect Password')
    //     return false
    //   }
    // } else {
    //   alert("Incorrect Ac. No.")
    //   return false
    // }
  }

  gettransaction(acno: any) {
    const data = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction', data, this.gettoken())
  }

  deleteacc(acno: any) {
    return this.http.delete('http://localhost:3000/deleteacc/' + acno, this.gettoken())
  }

}

