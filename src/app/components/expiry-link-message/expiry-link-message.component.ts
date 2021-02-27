import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import LinkMessageResponse from '../view-message-link/response.interface';

@Component({
  selector: 'app-expiry-link-message',
  templateUrl: './expiry-link-message.component.html',
  styleUrls: ['./expiry-link-message.component.css']
})
export class ExpiryLinkMessageComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private activateRoute: ActivatedRoute) {

  }
  messageData: LinkMessageResponse
  messageId: string = "";
  isShowContent: Boolean = true;
  ngOnInit(): void {
    this.messageId = this.activateRoute.snapshot.params['id'];
    this.getData();
  }

  getData = () => {
    this.apiService._get(`link-message/${this.messageId}`).subscribe((response) => {
      if (response.status) {
        this.messageData = response['data'];
        console.log(this.messageData)
        if (!this.messageData.isExpired) {
          this.redirectToView();
        }
      }
      this.isShowContent = true;

    }, error => {
      console.log(error);
    })
  }


  redirectToView = () => {
    this.router.navigateByUrl(`view/${this.messageId}`)
  }
}
