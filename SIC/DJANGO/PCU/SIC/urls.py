from django.urls import path
from .import views

urlpatterns = [
    path("abc",views.hellow_word),
    path("xyz",views.hello)
]