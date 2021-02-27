import { Component, OnInit, ViewChild } from '@angular/core';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiService } from '../../../core/services/api.service';
class Page {
  size: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  pageNumber: number = 0;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  messagesData: any = []
  page = new Page();
  selectedType: string = "message"
  expiryType: Boolean = false;
  pageLimit: number = 10
  @ViewChild('ngxDatatable') ngxDatatable: DatatableComponent;
  ngOnInit(): void {
    this.getMessageData();
  }
  selectType = (type) => {
    this.selectedType = type;
    this.refreshData();
  }

  selectExpiry = (boolean) => {
    this.expiryType = boolean
    this.refreshData();
  }
  refreshData = () => {
    console.log("REFRRESG")
    this.messagesData = [];
         this.getMessageData()

  }

  getMessageData = () => {
    this.apiService._get(`link-message?type=${this.selectedType}&is_expired=${this.expiryType}&skip=0&limit=${this.pageLimit}`).subscribe((response) => {
      if (response.status) {
        this.messagesData = response['data'];
        this.page.totalPages = response['count'];
      }
    }, error => {
      console.log(error)
    })
  }


}
