from django.contrib import admin
from survey.models.answer_model import Answer, IntegerAnswer, OptionAnswer, TextAnswer
from survey.models.question_model import Question, QuestionOption
from survey.models.submission_model import Submission
from survey.models.survey_model import Survey
from survey.models.user_model import User
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import  gettext_lazy as _


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                    'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

# Register your models here.
admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(QuestionOption)
admin.site.register(Submission)
admin.site.register(Answer)
admin.site.register(TextAnswer)
admin.site.register(OptionAnswer)
admin.site.register(IntegerAnswer)