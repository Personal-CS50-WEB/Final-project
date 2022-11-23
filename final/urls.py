"""final URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from survey import views
from django.views.generic import TemplateView

router = routers.DefaultRouter()

router.register(r'submission', views.SubmissionView, 'submission')
router.register(r'survey', views.SurveyView, 'survey')
router.register(r'usersurveys', views.UserSurveyView, 'usersurveys')
router.register(r'usersubmissions', views.UserSubmissionView, 'usersubmissions')
router.register(r'surveysubmissions', views.SurveySubmissionView, 'surveysubmissions')
router.register(r'expiredSurvey', views.ExpiredSurveyViewSet, 'expiredsurvey')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

