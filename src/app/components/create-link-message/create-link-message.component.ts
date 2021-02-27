import { Component, OnInit } from '@angular/core';
import LinkMessageForm from './create-msg.interface';
import { ApiService } from '../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-link-message',
  templateUrl: './create-link-message.component.html',
  styleUrls: ['./create-link-message.component.css']
})
export class CreateLinkMessageComponent implements OnInit {

  //decl

  placeHolderText: string = "What do you want to say?"
  isShowOverlay: Boolean = false
  // formData
  expiry: number = 60
  formData: LinkMessageForm = { expiry: 60, message: null, type: "message" }
  currentURL: string = "";

  constructor(private apiService: ApiService, private toast: ToastrService) {
    this.currentURL = window.location.origin;
  }

  ngOnInit(): void {
    this.formData.expiry = 60;
    console.log(this.formData.expiry);

  }

  // choose type of

  chooseType = (type) => {
    this.formData.type = type

    if (type == "link") {
      this.placeHolderText = "What's the URL?"
    } else {
      this.placeHolderText = "What do you want to say?"
    }
  }

  resetForm = () => {
    this.formData = { expiry: 60, message: null, type: "message" };
  }

  submit = () => {
    this.currentURL = window.location.origin;
    if (this.formData.message != null) {
      if (this.formData.type == "link") {
        var expression = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}?/gi;
        var regex = new RegExp(expression);

        if (!this.formData.message.match(regex)) {
          return this.toast.error("Please enter valid Url")
        }
      }

      var today = new Date();
      today.setSeconds(today.getSeconds() + Number(this.expiry));
      this.formData.expiry = today.valueOf();
      this.apiService._post('link-message', this.formData).subscribe((response) => {
        if (response.status) {
          this.currentURL = `${this.currentURL}/view/${response.data.refId}`
          this.isShowOverlay = true;
        } else {
          this.toast.error(response.message);
        }
      }, error => {
        this.toast.error("Something went wrong!, Please try again.");
      })


    } else {
      this.toast.error(`${this.formData.type.toUpperCase()} Not be Empty`);
    }
  }
  closePopUp = () => {
    this.isShowOverlay = false;
    this.resetForm();
  }
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.toast.info("Link has been copied in clipboard");
  }

}
