import { Component, Output, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-new-sessions',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [CommonModule],
  providers: [DashService],
  templateUrl: './new-sessions.component.html',
  styleUrl: './new-sessions.component.css'
})
export class NewSessionsComponent implements OnInit, OnChanges {


  @Input()
  Sessions: any[];

  @Output() sesChange: EventEmitter<any> = new EventEmitter();

  constructor(private dashService: DashService) {this.Sessions = [];}
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  


  async deleteSession(session: number) {
    await this.dashService.deleteSession(session.toString());
    this.Sessions =  (await this.dashService.sessionsByUser()).sort((a: session, b: session ) => a.id - b.id);
    this.sesChange.emit('session deleted');
  }




}

class session {
  id: number = 0; 
  user_id: number = 0;
  buyIn: number = 0;
  cashOut: number = 0;
  timePlayed: number = 0
}
