import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationsComponent implements OnInit { 

  userProfilePicture: string
  selectedFile: File = null
  userNameMeta: string

  constructor() { }

  ngOnInit(): void {

  }



}

