from django.db import models
from datetime import timedelta
import datetime
from django.db.models import F

# Create your models here.

class estudiante(models.Model):
    cedula = models.CharField(max_length=8, primary_key=True)
    nombre = models.CharField(max_length=40)
    apellido = models.CharField(max_length=40)
    año = models.CharField(max_length=1)
    seccion = models.CharField(max_length=1)
    prestamos = models.CharField(max_length=6, default=0)

    def __str__(self):
        return f"{self.nombre} {self.apellido} {self.cedula}"

class academico(models.Model):
    cedula = models.CharField(max_length=8, primary_key=True)
    nombre = models.CharField(max_length=40)
    apellido = models.CharField(max_length=40)
    prestamos = models.CharField(max_length=6, default=0)

    def __str__(self):
        return f"{self.nombre} {self.apellido} {self.cedula}"

class administrativo(models.Model):
    cedula = models.CharField(max_length=8, primary_key=True)
    nombre = models.CharField(max_length=40)
    apellido = models.CharField(max_length=40)
    prestamos = models.CharField(max_length=6, default=0)

    def __str__(self):
        return f"{self.nombre} {self.apellido} {self.cedula}"

class libro(models.Model):
    codigolibro = models.CharField(primary_key=True, default=1, max_length=25)
    autor = models.CharField(max_length=20)
    titulo = models.CharField(max_length=35)
    materia = models.CharField(max_length=20)
    año = models.CharField(max_length=20)
    cantidad = models.CharField(max_length=6, default=0)
    cantidadPres = models.CharField(max_length=6, default=0)

    def __str__(self):
        return f"{self.codigolibro} {self.autor} {self.titulo}"

class prestamo(models.Model):
    codigo = models.AutoField(primary_key=True, default=1)
    codigolibro = models.CharField(max_length=25, default=1)
    autor = models.CharField(max_length=20, default="")
    titulo = models.CharField(max_length=20, default="")
    usuarios = [
        ('1', 'Estudiante'),
        ('2', 'Academico'),
        ('3', 'Administrativo'),  
    ]
    usuario = models.CharField(max_length=20, choices=usuarios, default="Estudiante")
    nombre = models.CharField(max_length=40, default="")
    apellido = models.CharField(max_length=40)
    cedula = models.CharField(max_length=8)
    bibliotecaria = models.CharField(max_length=40)
    tipoPrestamo = models.CharField(max_length=20, default="")
    tipoUsuario = models.CharField(max_length=20, default="")
    fechaInicial = models.CharField(max_length=8, default="")
    fechaFinal = models.CharField(max_length=8, default="")
    observaciones = models.CharField(max_length=40, default="") 

    def save(self, *args, **kwargs):
        super(prestamo, self).save(*args, **kwargs)
        libro.objects.filter(titulo=self.titulo).update(cantidadPres=F('cantidadPres') + 1)
        estudiante.objects.filter(cedula=self.cedula).update(prestamos=F('prestamos') + 1)
        academico.objects.filter(cedula=self.cedula).update(prestamos=F('prestamos') + 1)
        administrativo.objects.filter(cedula=self.cedula).update(prestamos=F('prestamos') + 1)

    def __str__(self):
        return f" {self.codigo} {self.nombre} {self.titulo}"
