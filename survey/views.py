from django.shortcuts import render
from rest_framework import viewsets
from survey.serializers import surveyserializer, submitionserializer
from .models import *
from rest_framework.response import Response

# Create your views here.
class SurveyView(viewsets.ModelViewSet):
    serializer_class = surveyserializer.SurveySerializer
    queryset = Survey.objects.all().order_by('-timecreated')


class SubmitionView(viewsets.ModelViewSet):
    serializer_class = submitionserializer.SubmitionSerializer
    queryset = Submition.objects.all().order_by('-timecreated')


class UserSubmitionView(viewsets.ModelViewSet):
    serializer_class = submitionserializer.UserSubmitionSerializer
    queryset = User.objects.all()


class UserSurveyView(viewsets.ModelViewSet):
    serializer_class = surveyserializer.UserSurveySerializer
    queryset = User.objects.all()

class SurveySubmtionView(viewsets.ModelViewSet):
    serializer_class = submitionserializer.SurveySubmitionSerializer
    queryset = Survey.objects.all()





    

