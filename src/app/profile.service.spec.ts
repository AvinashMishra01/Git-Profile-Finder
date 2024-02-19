
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  let httpClientSpy: { get: jasmine.Spy };
  let httpClient: jasmine.SpyObj<HttpClient>;

  // beforeEach(() => {
  //   const spy = jasmine.createSpyObj('HttpClient', ['get']);
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [ProfileService,
  //       // { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get']) },
  //       { provide: HttpClient, useValue: spy } 
  //     ]
  //   });
  //   service = TestBed.inject(ProfileService);
  //   httpMock = TestBed.inject(HttpTestingController);
  //   httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  //   spyOn(Swal, 'fire');
  // });
  beforeEach(() => {
  
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfileService,
      
      ]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(Swal, 'fire');
  });


  afterEach(() => {
    httpMock.verify();
  });

 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Returns an Observable with user profile data when given a valid username.


  // Handles and logs client-side or network errors with Swal alert.
  it('should return an Observable with user profile data when given a valid username', () => {
    const name = 'validUsername';
    const expectedUrl = 'https://api.github.com/users/validUsername';
    const mockProfileData = {
      // Define mock profile data here, simulating the response from the API
      // Example:
      name: 'John Doe',
      avatar_url: 'https://example.com/avatar.jpg',
      // Add other properties as needed
    };
  
    service.getProfile(name).subscribe(profileData => {
      expect(profileData).toEqual(mockProfileData); 
    });
  
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfileData); 
  });

// 2 

it('should return an Observable with user profile data when given a valid username', () => {
  const name = 'validUsername';
  const expectedUrl = 'https://api.github.com/users/validUsername';
  const mockProfileData = {
    name: 'John Doe',
   
  };

  service.getProfile(name).subscribe(profileData => {
    expect(profileData).toEqual(mockProfileData); 
  });

  const req = httpMock.expectOne(expectedUrl);
  expect(req.request.method).toBe('GET');
  req.flush(mockProfileData); 
});





  

});




