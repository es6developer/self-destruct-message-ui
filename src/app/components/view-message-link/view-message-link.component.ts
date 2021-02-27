import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { min } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import LinkMessageResponse from './response.interface';

@Component({
  selector: 'app-view-message-link',
  templateUrl: './view-message-link.component.html',
  styleUrls: ['./view-message-link.component.css']
})
export class ViewMessageLinkComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private activateRoute: ActivatedRoute) {

  }
  timeoutText: string = ""
  messageData: LinkMessageResponse;
  messageId: string = "";
  isShowContent: Boolean = false
  ngOnInit(): void {
    this.messageId = this.activateRoute.snapshot.params['id'];
    this.getData();
  }

  getData = () => {
    this.apiService._get(`link-message/${this.messageId}`).subscribe((response) => {
      console.log("response", response)
      if (response.status) {
        this.messageData = response['data'];
        this.decideAction();
      } else {
        this.redirectToExpiry();
      }

    }, error => {
      this.redirectToExpiry()
    })

  }
  decideAction = () => {

    if (this.messageData.isExpired) { return this.redirectToExpiry() };
    if (this.messageData.type == "message") { this.isShowContent = true; return this.initTime() };
    if (this.messageData.type == "link") { return this.redirectToWebSite(this.messageData.message) }

  }
  redirectToWebSite = (url) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = 'http://' + url;
    }
    console.log("url", url);
    window.location.replace(url);
  }
  initTime = () => {
    var expiryTime = new Date(this.messageData.expiry).getTime();
    var interval = setInterval(() => {
      var now = new Date().getTime();
      var diffTime = expiryTime - now;
      var days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
      let text = "Message will disappear in ";
      if (days != 0) {
        text += `${days}d `
      }
      if (hours != 0) {
        text += `${hours}h `
      }
      if (minutes != 0) {
        text += `${minutes}m `
      }
      if (seconds) {
        text += `${seconds}s`
      }


      if (diffTime < 0) {
        this.timeoutText = null;
        clearInterval(interval);
        this.redirectToExpiry()
      } else {
        this.isShowContent = true;
        this.timeoutText = text;
      }
    }, 1000);
  }

  redirectToExpiry = () => {
    this.router.navigateByUrl(`expiry/${this.messageId}`)
  }
}
