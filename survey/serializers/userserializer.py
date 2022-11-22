from survey.models import User
from . import dynamicserializer


class UserSerializer(dynamicserializer.DynamicFieldsModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']
