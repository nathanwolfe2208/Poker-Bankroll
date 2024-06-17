import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashComponent } from './dash.component';
import { DashService } from '../services/dash.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { defer, of, lastValueFrom } from 'rxjs';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Session } from 'inspector';
import { ChangeDetectionStrategy } from '@angular/core';
import { NewSessionsComponent } from './new-sessions/new-sessions.component';
import { UserStatsComponent } from './user-stats/user-stats.component';


const mockDashService = {
  getUser: jest.fn(() => {
    return Promise.resolve({id: 1, name: 'Test', Bankroll: 500, hours: 100, winrate: 5})
  }),
  submitSession: jest.fn(() => {
    return Promise.resolve();
  }),
  updateUser: jest.fn(() => {
    return Promise.resolve();
  }),
  sessionsByUser: jest.fn(() => {
    return Promise.resolve([
      {id: 1, user_id: 1, buyIn: 300, cashOut: 400, timePlayed: 3},
      {id: 2, user_id: 1, buyIn: 100, cashOut: 400, timePlayed: 3},
      {id: 3, user_id: 1, buyIn: 200, cashOut: 400, timePlayed: 3}
    ])
  }),
  deleteSession: jest.fn(() => {
    return Promise.resolve();
  })
}

describe('DashComponent', () => {
  let component: DashComponent;
  let fixture: ComponentFixture<DashComponent>;
  let service: DashService;
  let httpTesting: HttpTestingController;
  //const alertSpy = jest.spyOn(window, 'alert');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashComponent, NewSessionsComponent, UserStatsComponent],
      providers: [{provide: DashService, useValue: mockDashService}, provideHttpClient(), provideHttpClientTesting()],
      teardown: {destroyAfterEach: false}
    }).overrideComponent(DashComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
    
    fixture = TestBed.createComponent(DashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(DashService);
    httpTesting = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy()
    }
    mockDashService.getUser.mockReset()
    mockDashService.sessionsByUser.mockReset();
    mockDashService.updateUser.mockReset();
  })



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing ngOnInit', async () => {
    const expectedSessions = [
      {id: 1, user_id: 1, buyIn: 300, cashOut: 400, timePlayed: 3},
      {id: 2, user_id: 1, buyIn: 100, cashOut: 400, timePlayed: 3},
      {id: 3, user_id: 1, buyIn: 200, cashOut: 400, timePlayed: 3}
    ];
  
    const req = httpTesting.expectOne({ method: 'GET', url: 'http://localhost:3000/api/v1/sessions'}).flush(expectedSessions);
  
     
  
    component.ngOnInit();
    await fixture.whenStable(); // ASK WHY THIS WORKED
  
    
    expect(expectedSessions).toEqual(component.updatedSessions);
    expect(component.newSession).toEqual({user_id: 1,
      buyIn: 0,
      cashOut: 0,
      timePlayed: 0});

   
    
  });

  it('Testing OnSubmit with valid input', async () => {
    const expectedUser = {id: 1, name: 'Test', Bankroll: 500, hours: 100, winrate: 5};
    
    

    component.newSession = {user_id: 1, buyIn: 100, cashOut: 200, timePlayed: 5};

    component.onSubmit();
    await fixture.whenStable();

    const submitReq = httpTesting.expectOne({ method: 'POST', url: 'http://localhost:3000/api/v1/sessions' }).flush({});
    
    //expect(window.alert).toHaveBeenCalledTimes(0);
      
  })
  it('on submit with put request', async () => {
    component.onSubmit();
    await fixture.whenStable();

    const updateReq = httpTesting.expectOne({method: 'PUT', url: 'http://localhost:3000/api/v1/users/1'}).flush({}); 
  });
  
  it('On submit gets new user stats', async () => {
    const onSubmitSpy = jest.spyOn(component, 'onSubmit');
    const getUserSpy = jest.spyOn(service, 'getUser');
    //const submitSesSpy = jest.spyOn(service, 'submitSession');
    //const updateUserSpy = jest.spyOn(service, 'updateUser');

    
    component.newSession = { user_id: 1, buyIn: 100, cashOut: 200, timePlayed: 5 };
    component.onSubmit();
    await fixture.whenStable();

    
  
  
    
  
   
    //expect(onSubmitSpy).toHaveBeenCalled();
    //expect(getUserSpy).toHaveBeenCalled();
    /*expect(component.updatedSessions).toEqual([
      {id: 1, user_id: 1, buyIn: 300, cashOut: 400, timePlayed: 3},
      {id: 2, user_id: 1, buyIn: 100, cashOut: 400, timePlayed: 3},
      {id: 3, user_id: 1, buyIn: 200, cashOut: 400, timePlayed: 3}
    ])*/
    expect(component.user1).toEqual({id: 1, name: 'Test', Bankroll: 500, hours: 100, winrate: 5});
  });
  it('On submit gets new sessions list', async() => {
    const expectedSessions = [
      { id: 1, user_id: 1, buyIn: 300, cashOut: 400, timePlayed: 3 },
      { id: 2, user_id: 1, buyIn: 100, cashOut: 400, timePlayed: 3 },
      { id: 3, user_id: 1, buyIn: 200, cashOut: 400, timePlayed: 3 }
    ];
    
    
    const sessionsByReq = httpTesting.expectOne({ method: 'GET', url: 'http://localhost:3000/api/v1/sessions' }).flush(expectedSessions);
    

    component.onSubmit();
    await fixture.whenStable();
    
    
    expect(component.updatedSessions).toEqual(expectedSessions);
    console.log(component.updatedSessions);
  })
});


