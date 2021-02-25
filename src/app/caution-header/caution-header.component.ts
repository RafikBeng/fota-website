import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caution-header',
  templateUrl: './caution-header.component.html',
  styleUrls: ['./caution-header.component.scss']
})
export class CautionHeaderComponent implements OnInit {

  chromiumVersion: String = '';

  constructor() { }

  ngOnInit(): void {

    this.getChromiumVersion();

  }

  getChromiumVersion() {
    navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)![1] != null || undefined ? 
        this.chromiumVersion = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)![1] :
        this.chromiumVersion = "INCOMPAT_BROWSER"


  }

}
