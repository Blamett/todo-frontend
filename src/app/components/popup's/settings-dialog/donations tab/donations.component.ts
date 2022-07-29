import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit { 

  userProfilePicture: string
  selectedFile: File = null
  userNameMeta: string

  constructor() { }

  ngOnInit(): void {

  }



}

