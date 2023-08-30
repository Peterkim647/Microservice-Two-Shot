from django.db import models

# Create your models here.

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=150)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

class Hat(models.Model):
    """
    The Hat model represents a hat that a person wants to add to their closet

    """
    style = models.CharField(max_length=150)
    color = models.CharField(max_length=150)
    fabric = models.CharField(max_length=150)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
