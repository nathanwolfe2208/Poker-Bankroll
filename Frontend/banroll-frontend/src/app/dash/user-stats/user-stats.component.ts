import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule,],
  providers: [DashService],
  templateUrl: './user-stats.component.html',
  styleUrl: './user-stats.component.css'
})
export class UserStatsComponent implements OnInit, OnChanges {

  @Input() userStats:any;
  @Input() sesChange: EventEmitter<any> = new EventEmitter;

  constructor(private dashService: DashService) {}

  async ngOnInit(): Promise<void> {
    const userID = 1;
    this.userStats = await this.dashService.getUser(userID); 
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
