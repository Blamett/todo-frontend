import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit { 

  userProfilePicture: string
  selectedFile: File = null
  userNameMeta: string

  constructor() { }

  ngOnInit(): void {

  }



}

