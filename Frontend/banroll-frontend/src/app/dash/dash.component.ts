import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashService } from '../services/dash.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { NewSessionsComponent } from './new-sessions/new-sessions.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { GraphComponent } from './graph/graph.component';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [CommonModule, FormsModule, NewSessionsComponent, UserStatsComponent, GraphComponent],
  providers: [DashService],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})



export class DashComponent implements OnInit{

  user1: any;
  
  @Output() updatedSessions: session[];
  newSession = {
    user_id: 1,
    buyIn: 0,
    cashOut: 0,
    timePlayed: 0
  } 

  constructor(private dashService: DashService) {this.updatedSessions = [];}
  
  async ngOnInit(): Promise<void> {
    this.updatedSessions =  (await this.dashService.sessionsByUser()).sort((a: session, b: session ) => a.id - b.id);
    this.newSession = {
      user_id: 1,
      buyIn: 0,
      cashOut: 0,
      timePlayed: 0
    }
  }

  async onSubmit(): Promise<void> {
    const userID = 1;
    await this.dashService.submitSession(this.newSession);
    await this.dashService.updateUser();
    this.user1 = await this.dashService.getUser(userID);
    this.updatedSessions =  (await this.dashService.sessionsByUser()).sort((a: session, b: session ) => a.id - b.id);
    this.newSession = {
      user_id: 1,
      buyIn: 0,
      cashOut: 0,
      timePlayed: 0
    }
}

  async onSessionChange(event: any) {
    const userID = 1;
    await this.dashService.updateUser();
    this.user1 = await this.dashService.getUser(userID);
    this.updatedSessions =  (await this.dashService.sessionsByUser()).sort((a: session, b: session ) => a.id - b.id);
  }
}

class session {
  id: number = 0; 
  user_id: number = 0;
  buyIn: number = 0;
  cashOut: number = 0;
  timePlayed: number = 0
}
