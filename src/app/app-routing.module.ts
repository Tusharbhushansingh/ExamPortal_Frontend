import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCatorgiesComponent } from './pages/admin/view-catorgies/view-catorgies.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpVerifyComponent } from './pages/otp-verify/otp-verify.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { LoadSpecificQuizComponent } from './pages/user/load-specific-quiz/load-specific-quiz.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },  
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'forgetpassword',
    component:ForgetPasswordComponent,
    pathMatch:'full',
  },
  {
    path:'otpverify/:email',
    component:OtpVerifyComponent,
    pathMatch:'full',
  },
  {
    path:'changepassword/:email',
    component:ChangePasswordComponent,
    pathMatch:'full',
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'categories',
        component:ViewCatorgiesComponent,
      },
      {
        path:'add-category',
        component:AddCategoryComponent,
      },
      {
        path:'view-quizzes',
        component:ViewQuizzesComponent,
      },
      {
        path:'add-quiz',
        component:AddQuizComponent,
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent,
      },

      {
        path:'view-questions/:qid/:title',
        component:ViewQuizQuestionsComponent,
      },

      {
        path:'add-question/:qid/:title',
        component:AddQuestionComponent,
      },

      {
        path:'update-question/:quesid/:title',
        component:UpdateQuestionComponent,
      },
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:'0',
        component:LoadQuizComponent
      },
      {
        path:':catid',
        component:LoadSpecificQuizComponent
      },
      {
        path:'instructions/:qid',
        component:QuizInstructionsComponent
      },

    ]
  },
  {
    path:'start/:qid',
    component:QuizStartComponent,
    canActivate:[NormalGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
