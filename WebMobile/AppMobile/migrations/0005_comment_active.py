# Generated by Django 4.1.2 on 2022-10-28 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AppMobile', '0004_rename_content_comment_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]