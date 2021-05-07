from django.contrib import admin

from book.models import Books, Author

admin.site.register([Books, Author])
