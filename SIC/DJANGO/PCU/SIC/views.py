# from django.shortcuts import render
from django.http import HttpResponse
def hellow_word(request):
    return HttpResponse("Hello Pune")
def hello(request):
    return HttpResponse("Hello Mumbai")
# Create your views here.
