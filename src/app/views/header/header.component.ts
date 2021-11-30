import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SettingsDialogComponent } from 'src/app/dialog/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() categoryName: string
  @Input() showStat: boolean
  @Input() opened:boolean
  
  @Output() toggleStat = new EventEmitter<boolean>()
  @Output() toggleMenu = new EventEmitter()

  isMobile: boolean

  constructor(private dialog: MatDialog, private deviceService: DeviceDetectorService) { }
  
  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile()
  }

  showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent,
      {
        autoFocus: false,
        width: '500px'
      })
  }

  onToggleStat(): void {
    this.toggleStat.emit(!this.showStat); // вкл/выкл статистику
  }

  onToggleMenu() {
    this.toggleMenu.emit()
  }

}
