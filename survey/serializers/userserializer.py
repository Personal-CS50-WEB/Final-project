from survey.models.user_model import User
from . import dynamicserializer


class UserSerializer(dynamicserializer.DynamicFieldsModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']
