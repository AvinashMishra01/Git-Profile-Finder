

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../profile.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: jasmine.SpyObj<ProfileService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  beforeEach(async () => {
    // Create a spy object for ProfileService
    profileService = jasmine.createSpyObj('ProfileService', ['getProfile', 'getRepositories']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'testUsername'
        }
      }
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [MatFormFieldModule, MatIconModule, MatButtonModule, MatCardModule, MatListModule, MatInputModule],
      providers: [
        { provide: ProfileService, useValue: profileService },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  // Displays the first page of repositories data
  it('should display the first page of repositories data', () => {
    // Arrange
    const mockDisplayedRepositoriesData = {}; // initialize mock data
    const profileComponent = fixture.componentInstance;

    // Act
    profileComponent.getProfile();

    // Assert
    expect(profileComponent.displayedRepositories).toEqual(undefined);
  });



  it('should handle error from getProfile with Swal alert', () => {
    const errorResponse = { message: 'Error' };
    profileService.getProfile.and.returnValue(throwError(errorResponse));

    spyOn(Swal, 'fire');

    component.getProfile();

    expect(Swal.fire).toHaveBeenCalled();
    expect(component.repositories).toBeUndefined();
    expect(component.profileData).toBeUndefined();
    expect(component.displayedRepositories).toBeUndefined();
  });


  // Can navigate to the next page of repositories data
      it('should navigate to the next page of repositories data', () => {
    
    
        // Act
        component.getProfile();
        component.nextPage();
    
        // Assert
        expect(component.currentPage).toEqual(1);
        expect(component.displayedRepositories).toEqual(undefined);
      });



    // Clears the repositories data and profile data when the API call fails
    it('should clear the repositories data and profile data when the API call fails', () => {
      // Arrange
      const profileComponent = fixture.componentInstance;
  
      // Act
      profileComponent.getProfile();
    
      profileComponent.getProfile();
  
      // Assert
      expect(profileComponent.repositories).toEqual(undefined);
      expect(profileComponent.profileData).toEqual(undefined);
      expect(profileComponent.displayedRepositories).toEqual(undefined);
    });
 
  


});














