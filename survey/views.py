from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class CreateSurveyView(viewsets.ModelViewSet):
    serializer_class = SurveySerializer
    queryset = Survey.objects.all()

class QuestionOptionView(viewsets.ModelViewSet):
    serializer_class = QuestionOptionSerializer
    queryset = QuestionOption.objects.all()

class SurveytView(viewsets.ModelViewSet):
    serializer_class = SurveySerializer
    queryset = Survey.objects.filter(is_active=True)

    @action(methods=['GET'], detail=False)
    def new(self, request):
        newest = self.get_queryset().order_by('timecreated').last()
        serializers = self.get_serializer_class()(newest)
        return Response(serializers.data)
    

class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    def create(self, request, *args, **kwargs):

        question_data = request.data
        new_question = Question.objects.create(
            survey=Survey.objects.get(id=question_data['survey']),
            type=question_data['type'],
            text=question_data['text']
        )
        new_question.save()
        if question_data['type'] == 'Radio' or 'Checkbox':
            for eachoption in question_data['options']:
                option =  QuestionOption.objects.create(
                    question=new_question,
                    option=eachoption
                )
                option.save()
        
        serializer =  QuestionSerializer(new_question)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        questions = Question.objects.filter(survey=kwargs['pk'])
        serializer =  QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    

