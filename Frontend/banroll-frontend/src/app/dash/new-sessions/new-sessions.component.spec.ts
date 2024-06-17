import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewSessionsComponent } from './new-sessions.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { DashService } from '../../services/dash.service';
import { provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';

describe('NewSessionsComponent', () => {
  let component: NewSessionsComponent;
  let fixture: ComponentFixture<NewSessionsComponent>;
  let httpClientSpy: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSessionsComponent],
      providers: [DashService, provideHttpClient(), provideHttpClientTesting()],
      teardown: {destroyAfterEach: false}
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('testing deleteSession func', async () => {
    const service = new DashService(httpClientSpy);
    const httpTesting = TestBed.inject(HttpTestingController);
    jest.spyOn(component.sesChange, 'emit');
    const deleteSessionSpy = jest.spyOn(component, 'deleteSession');
    const DeleteSessionSpy = jest.spyOn(service, 'deleteSession');
    const SessionsByUserSpy = jest.spyOn(service, 'sessionsByUser');
    const expectedSessions = [
      {id: 1, user_id: 1, buyIn: 300, cashOut: 400, timePlayed: 3},
      {id: 2, user_id: 1, buyIn: 100, cashOut: 400, timePlayed: 3},
      {id: 3, user_id: 1, buyIn: 200, cashOut: 400, timePlayed: 3}
    ];


    component.Sessions = expectedSessions;

  
    
  
   
    component.deleteSession(1);
    await fixture.whenStable();

    expect(deleteSessionSpy).toHaveBeenCalled();
    expect(deleteSessionSpy).toHaveBeenCalledWith(1);
    
    //const req2 = httpTesting.expectOne({ method: 'DELETE', url: 'http://localhost:3000/api/v1/sessions/1'}).flush('');
    //const sessionsByReq = httpTesting.expectOne({ method: 'GET', url: 'http://localhost:3000/api/v1/sessions' }).flush(expectedSessions); 
    
    
    

    

    //expect(DeleteSessionSpy).toHaveBeenCalled();
    //expect(SessionsByUserSpy).toHaveBeenCalled();
    //expect(component.sesChange.emit).toHaveBeenCalled();


  });
*/


});
