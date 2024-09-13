from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NotesListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NotesDelete.as_view(), name="delete-note"),
]