import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsComponent } from './user-stats.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('UserStatsComponent', () => {
  let component: UserStatsComponent;
  let fixture: ComponentFixture<UserStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing ngOnInit', async () => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const expectedUser = {id: 1, name: 'Test', Bankroll: 500, hours: 100, winrate: 5};

    const Usereq = httpTesting.expectOne({ method: 'GET', url: 'http://localhost:3000/api/v1/users/1' }).flush(expectedUser);

    //component.userStats = expectedUser; //DONT THINK THIS IS RIGHT

    component.ngOnInit();
    await fixture.whenStable();

    

    expect(component.userStats).toEqual(expectedUser);


  })
});
