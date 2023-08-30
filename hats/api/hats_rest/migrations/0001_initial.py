# Generated by Django 4.0.3 on 2023-08-29 23:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LocationVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('import_href', models.CharField(max_length=200, unique=True)),
                ('closet_name', models.CharField(max_length=150)),
                ('section_number', models.PositiveSmallIntegerField()),
                ('shelf_number', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Hat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('style', models.CharField(max_length=150)),
                ('color', models.CharField(max_length=150)),
                ('fabric', models.CharField(max_length=150)),
                ('picture_url', models.URLField(null=True)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hats', to='hats_rest.locationvo')),
            ],
        ),
    ]
