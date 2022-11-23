from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(QuestionOption)
admin.site.register(User)
admin.site.register(Submission)
admin.site.register(Answer)
admin.site.register(TextAnswer)
admin.site.register(OptionAnswer)
admin.site.register(IntegerAnswer)