import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';
import { DashService } from './services/dash.service';
import { FormsModule } from '@angular/forms';
import { NewSessionsComponent } from './dash/new-sessions/new-sessions.component';
import { UserStatsComponent } from './dash/user-stats/user-stats.component';

@NgModule({
  declarations: [AppComponent, DashComponent, NewSessionsComponent, UserStatsComponent],
  imports: [FormsModule],
  providers: [DashService],
  bootstrap: [AppComponent]
})
export class AppModule {}