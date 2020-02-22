from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='my-website-home'),
    path('MNISTDigitReader/', views.MNISTDigitReader, name='MNIST-Digit-Reader'),
    path('Read-Number/', views.ReadNumber, name='Read-Number'),
    path('Contact-Info/', views.ContactInfo, name='Contact-Info'),
]