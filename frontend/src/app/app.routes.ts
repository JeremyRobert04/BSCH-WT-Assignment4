import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriesComponent } from './categories/categories.component';
import { DescribeCategoryComponent } from './describe-category/describe-category.component';
import { DescribeQuestionComponent } from './describe-question/describe-question.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/category', component: DescribeCategoryComponent },
  {
    path: 'categories/category/question',
    component: DescribeQuestionComponent,
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
