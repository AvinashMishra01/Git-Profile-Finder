

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

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    // Create a spy object for ProfileService
    const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile', 'getRepositories']);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [MatFormFieldModule, MatIconModule, MatButtonModule, MatCardModule, MatListModule, MatInputModule],
      providers: [{ provide: ProfileService, useValue: profileServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfile on service and set profileData', () => {
    const mockProfileData = { /* your mock profile data */ };
    profileService.getProfile.and.returnValue(of(mockProfileData));

    component.getProfile();

    expect(profileService.getProfile).toHaveBeenCalledWith(component.name);
    expect(component.profileData).toEqual(mockProfileData);
  });

  // Displays the first page of repositories data
  it('should display the first page of repositories data', () => {
    // Arrange
    const mockDisplayedRepositoriesData = {}; // initialize mock data
    const profileComponent = new ProfileComponent(profileService);

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

    expect(Swal.fire).toHaveBeenCalledWith('Oops...', 'Error fetching profile data. Please try again later.', 'error');
    expect(component.repositories).toEqual([]);
    expect(component.profileData).toBeNull();
    expect(component.displayedRepositories).toEqual([]);
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
      const profileComponent = new ProfileComponent(profileService);
  
      // Act
      profileComponent.getProfile();
    
      profileComponent.getProfile();
  
      // Assert
      expect(profileComponent.repositories).toEqual(undefined);
      expect(profileComponent.profileData).toEqual(undefined);
      expect(profileComponent.displayedRepositories).toEqual(undefined);
    });

    // Displays an error message when the name contains spaces
    it('should display an error message when the name contains spaces', () => {
      // Arrange
      component.name = 'Avinash ';
  
      // Act
      spyOn(Swal, 'fire');
      component.getProfile();
      // Assert
      expect(profileService.getProfile).toHaveBeenCalled();
      expect(component.repositories).toEqual(undefined);
      expect(component.profileData).toEqual(undefined);
      expect(component.displayedRepositories).toEqual(undefined);
    });


});

















