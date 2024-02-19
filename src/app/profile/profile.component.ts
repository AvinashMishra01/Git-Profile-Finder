
import { Component,  } from '@angular/core';
import { ProfileService } from '../profile.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {


  constructor(private profileService: ProfileService) {}

  name='Avinash';
  profileData: any;
  repositories;
  

  displayedRepositories;
  pageSize=5;
  currentPage = 0;


// getProfile() {
//   console.log("this is url", this.name);
  
//   this.profileService.getProfile(this.name).subscribe(profileData => {
//     console.log(profileData);
//     this.profileData = profileData;

//     // Get repositories URL
//     const repositoriesUrl = profileData['repos_url'];

//     // Fetch repositories
//     this.profileService.getRepositories(repositoriesUrl).subscribe(repositoriesData => {
//       console.log(repositoriesData);
//       this.repositories = repositoriesData;
//       this.displayedRepositories= this.repositories.slice(0, this.pageSize);
//     }, error => {
//       console.error('Error fetching repositories:', error);
//     });
//   }, error => {
//     Swal.fire('Oops...', 'Something went wrong! Please try again. Try to not give space in betweeen the name', 'error');
//   this.repositories=[]
//   this.profileData= null
//   this.displayedRepositories=[];
//   });
// }

getProfile() {
  console.log("this is url", this.name);

  this.profileService.getProfile(this.name)?.subscribe(
    profileData => {
      console.log(profileData);
      this.profileData = profileData;

      // Get repositories URL
      const repositoriesUrl = profileData['repos_url'];

      if (repositoriesUrl) {
        // Fetch repositories
        this.profileService.getRepositories(repositoriesUrl).subscribe(
          repositoriesData => {
            console.log(repositoriesData);
            this.repositories = repositoriesData;
            this.displayedRepositories = this.repositories.slice(0, this.pageSize);
          },
          error => {
            console.error('Error fetching repositories:', error);
            Swal.fire('Oops...', 'Error fetching repositories. Please try again later.', 'error');
          }
        );
      } else {
        console.error('Repositories URL is undefined');
        Swal.fire('Oops...', 'Repositories URL is undefined. Please try again later.', 'error');
      }
    },
    error => {
      console.error('Error fetching profile:', error);
      Swal.fire('Oops...', 'Error fetching profile data. Please try again later.', 'error');
      this.repositories = [];
      this.profileData = null;
      this.displayedRepositories = [];
    }
  );
}




goTORepo(repoUrl) {
  console.log(repoUrl);
}

// Function to display next repositories
 nextPage() {
  this.currentPage++;
  if (this.currentPage >= Math.ceil(this.repositories?.length / this.pageSize)) {
      this.currentPage = Math.floor(this.repositories?.length / this.pageSize);
  }
  this.displayCurrentPage();
}

// Function to display previous repositories
 previousPage() {
  this.currentPage--;
  if (this.currentPage < 0) {
      this.currentPage = 0;
  }
  this.displayCurrentPage();
}


 displayCurrentPage() {
  let startIndex = this.currentPage * this.pageSize;
  let endIndex = startIndex + this.pageSize;
  let currentPageItems = this.repositories?.slice(startIndex, endIndex);
  console.log(currentPageItems);
  this.displayedRepositories= currentPageItems;
}


isLastPage() {
  return this.currentPage >= Math.ceil(this.repositories?.length / this.pageSize) - 1;
}

isFirstPage() {
  return this.currentPage <= 0;
}

}


