from rest_framework import views
from rest_framework import status
from survey.models.question_model import QUESTION_TYPES
from rest_framework.response import Response


class TypesAPIView(views.APIView):

    def get(self, request, format=None):

        Types = []
        types_dict = dict(QUESTION_TYPES)
        for key, value in types_dict.items():

            itered_dict = {"key": key, "value": value}
            Types.append(itered_dict)
    
        return Response(Types, status=status.HTTP_200_OK)
