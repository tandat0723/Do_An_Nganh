# Generated by Django 4.0.2 on 2022-08-18 04:53

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('AppMobile', '0003_category_active_categoryproduct_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ProductCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.CharField(max_length=14)),
                ('num_photo', models.CharField(blank=True, max_length=2)),
                ('color', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.color')),
                ('product_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.product')),
            ],
            options={
                'unique_together': {('product_id', 'color')},
            },
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.RenameField(
            model_name='orderdetail',
            old_name='order_id',
            new_name='order',
        ),
        migrations.RenameField(
            model_name='orderdetail',
            old_name='product_id',
            new_name='product',
        ),
        migrations.AlterField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AlterUniqueTogether(
            name='orderdetail',
            unique_together={('order', 'product')},
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(blank=True, max_length=255)),
                ('name', models.CharField(max_length=255, null=True)),
                ('phone', models.CharField(max_length=11)),
                ('fax', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=20)),
                ('image', models.ImageField(blank=True, upload_to='stores/%Y/%m')),
                ('description', ckeditor.fields.RichTextField()),
                ('open_hour', models.CharField(max_length=200)),
                ('district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.district')),
                ('province', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.province')),
            ],
            options={
                'unique_together': {('name', 'district')},
            },
        ),
        migrations.AddField(
            model_name='district',
            name='province',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='district', related_query_name='my_district', to='AppMobile.province'),
        ),
        migrations.CreateModel(
            name='Rate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.SmallIntegerField(default=0)),
                ('product', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.product')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('product', 'user')},
            },
        ),
        migrations.CreateModel(
            name='ProductStoreCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.CharField(max_length=7)),
                ('district', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.district')),
                ('product', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.product')),
                ('product_code', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.productcode')),
                ('province', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.province')),
                ('store', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.store')),
            ],
            options={
                'unique_together': {('product_code', 'store')},
            },
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=False)),
                ('product', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.product')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('product', 'user')},
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=30)),
                ('content', ckeditor.fields.RichTextField()),
                ('product', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='AppMobile.product')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('product', 'user')},
            },
        ),
    ]
