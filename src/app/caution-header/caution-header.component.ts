import { AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caution-header',
  templateUrl: './caution-header.component.html',
  styleUrls: ['./caution-header.component.scss']
})
export class CautionHeaderComponent implements OnInit, AfterContentInit {

  public chromium89Compatible: Boolean;
  public notificationStatus: String = "";
  public caution: String = 'CAUTION';
  public warning: String = 'WARNING';
  public versionText: String = "You\'re using ";
  private navigator = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/);

  private headerColour = [
    {
      'chromium': true,
      'backgroundColor': '#ffba00',
    },
    {
      'chromium': false,
      'backgroundColor': '#F85149',
    }
  ];

  constructor() { }

  getChromiumVersion() {
    if ( this.navigator != null && this.navigator[1].includes("89.")) {
      this.chromium89Compatible = true;
      this.notificationStatus = this.caution;
      return this.versionText += "Chromium " + navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)![1];
    } else if ( this.navigator != null && this.navigator[0].includes("Chrome")) {
      this.chromium89Compatible = false;
      this.notificationStatus = this.caution;
      return this.versionText += "an incompatible version. Please update Chrome."
    } else {
      this.chromium89Compatible = false;
      this.notificationStatus = this.warning;
      return this.versionText += "an incompatible browser. Please open this page in Google Chrome."
    }
  }

  getColour(element?: string) {
    return this.headerColour.filter(item => item.chromium == this.versionText.includes("Chromium"))[0].backgroundColor;
}

getHidden() {
  return this.chromium89Compatible === true ? 'none' : '';
}

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    this.getChromiumVersion();
  }

}
