REM BAT QUE CREA VARIABLES DE ENTORNO MODIFICAR SEGUN SEA NECESARIO.
REM EL .BAT SE TIENE QUE EJECUTAR COMO ADMINISTRADOR.

@echo off
setx PLANTIOT_USERNAME /m "plantiot"
setx PLANTIOT_TOKEN /m "oauth:"
setx PLANTIOT_CHANNEL /m "plantiot"
pause