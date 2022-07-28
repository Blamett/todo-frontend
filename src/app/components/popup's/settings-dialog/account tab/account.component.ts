import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytes } from "firebase/storage";
import { timeout } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

const firebaseConfig = {
  apiKey: "AIzaSyAb8G-GPbDOoCBVqxPVVfldOj8M9NA82pk",
  authDomain: "todoapp-6cb9e.firebaseapp.com",
  projectId: "todoapp-6cb9e",
  storageBucket: "todoapp-6cb9e.appspot.com",
  messagingSenderId: "1030358084338",
  appId: "1:1030358084338:web:4c1b9f28edcdab55913e6b",
  measurementId: "G-V5TS53W228"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

@Component({
  selector: 'app-test',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userProfilePicture: string
  selectedFile: File = null
  userNameMeta: string
  isLoaded: boolean = true

  @ViewChild("emailLabel")
  email: ElementRef;

  constructor(
    private readonly httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getUserProfilePicture()
    this.getUsernameAndEmail()
  }

  sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onFileSelected(inputUpload: HTMLInputElement) {

    this.isLoaded = true

    const file = inputUpload.files[0];

    const ext = file.name.split(".").pop();

    this.selectedFile = new File([await file.arrayBuffer()], `baldinho.${ext}`, { type: file.type });

    inputUpload.value = null;

    const storageRef = ref(storage, `${this.selectedFile.name}`);

    localStorage.setItem("userImg", this.selectedFile.name)

    const metadata = {
      customMetadata: {
        'fromUser': `${this.userNameMeta}`,
      }
    };

    await uploadBytes(storageRef, this.selectedFile, metadata).then(() => {
      console.log('Profile picture updated');
    });

    this.getUserProfilePicture()

  }

  async getUserProfilePicture() {

    const userImg = localStorage.getItem("userImg")

    const storageRef = ref(storage, userImg);

    await getMetadata(storageRef)
      .then((metadata0) => {

        const userStoragaRef = ref(storage, `${metadata0.name}`);

        getDownloadURL(userStoragaRef).then((downloadURL) => {
          this.userProfilePicture = downloadURL
        });

      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!")
      });

    await this.sleep(500)

    this.isLoaded = false

  }

  async getUsernameAndEmail() {

    const user = await this.httpService.get('user/me')
    const userRes = (user.responseBody as { username: string, email: string })

    this.userNameMeta = userRes.username

    this.email.nativeElement.innerText = userRes.email

  }

}

