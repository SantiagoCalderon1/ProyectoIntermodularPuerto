import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tripulante } from '../../tripulante';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { ToastrService } from 'ngx-toastr';
import { TransitosService } from '../../transitos.service';

@Component({
  selector: 'app-tripulantes',
  standalone: false,

  templateUrl: './tripulantes.component.html',
  styleUrl: './tripulantes.component.css'
})
export class TripulantesComponent {
  paises = [
    { nombre: "Afganistán" }, { nombre: "Albania" }, { nombre: "Alemania" }, { nombre: "Andorra" },
    { nombre: "Angola" }, { nombre: "Antigua y Barbuda" }, { nombre: "Arabia Saudita" }, { nombre: "Argelia" },
    { nombre: "Argentina" }, { nombre: "Armenia" }, { nombre: "Australia" }, { nombre: "Austria" },
    { nombre: "Azerbaiyán" }, { nombre: "Bahamas" }, { nombre: "Bangladés" }, { nombre: "Baréin" },
    { nombre: "Barbados" }, { nombre: "Bélgica" }, { nombre: "Belice" }, { nombre: "Benín" },
    { nombre: "Bielorrusia" }, { nombre: "Birmania/Myanmar" }, { nombre: "Bolivia" }, { nombre: "Bosnia y Herzegovina" },
    { nombre: "Botsuana" }, { nombre: "Brasil" }, { nombre: "Brunéi" }, { nombre: "Bulgaria" },
    { nombre: "Burkina Faso" }, { nombre: "Burundi" }, { nombre: "Bután" }, { nombre: "Cabo Verde" },
    { nombre: "Camboya" }, { nombre: "Camerún" }, { nombre: "Canadá" }, { nombre: "Catar" },
    { nombre: "Chad" }, { nombre: "Chile" }, { nombre: "China" }, { nombre: "Chipre" },
    { nombre: "Colombia" }, { nombre: "Comoras" }, { nombre: "Corea del Norte" }, { nombre: "Corea del Sur" },
    { nombre: "Costa de Marfil" }, { nombre: "Costa Rica" }, { nombre: "Croacia" }, { nombre: "Cuba" },
    { nombre: "Dinamarca" }, { nombre: "Dominica" }, { nombre: "Ecuador" }, { nombre: "Egipto" },
    { nombre: "El Salvador" }, { nombre: "Emiratos Árabes Unidos" }, { nombre: "Eritrea" }, { nombre: "Eslovaquia" },
    { nombre: "Eslovenia" }, { nombre: "España" }, { nombre: "Estados Unidos" }, { nombre: "Estonia" },
    { nombre: "Esuatini" }, { nombre: "Etiopía" }, { nombre: "Filipinas" }, { nombre: "Finlandia" },
    { nombre: "Fiyi" }, { nombre: "Francia" }, { nombre: "Gabón" }, { nombre: "Gambia" },
    { nombre: "Georgia" }, { nombre: "Ghana" }, { nombre: "Granada" }, { nombre: "Grecia" },
    { nombre: "Guatemala" }, { nombre: "Guinea" }, { nombre: "Guinea-Bisáu" }, { nombre: "Guinea Ecuatorial" },
    { nombre: "Guyana" }, { nombre: "Haití" }, { nombre: "Honduras" }, { nombre: "Hungría" },
    { nombre: "India" }, { nombre: "Indonesia" }, { nombre: "Irak" }, { nombre: "Irán" },
    { nombre: "Irlanda" }, { nombre: "Islandia" }, { nombre: "Islas Marshall" }, { nombre: "Islas Salomón" },
    { nombre: "Israel" }, { nombre: "Italia" }, { nombre: "Jamaica" }, { nombre: "Japón" },
    { nombre: "Jordania" }, { nombre: "Kazajistán" }, { nombre: "Kenia" }, { nombre: "Kirguistán" },
    { nombre: "Kiribati" }, { nombre: "Kuwait" }, { nombre: "Laos" }, { nombre: "Lesoto" },
    { nombre: "Letonia" }, { nombre: "Líbano" }, { nombre: "Liberia" }, { nombre: "Libia" },
    { nombre: "Liechtenstein" }, { nombre: "Lituania" }, { nombre: "Luxemburgo" }, { nombre: "Madagascar" },
    { nombre: "Malasia" }, { nombre: "Malaui" }, { nombre: "Maldivas" }, { nombre: "Malí" },
    { nombre: "Malta" }, { nombre: "Marruecos" }, { nombre: "Mauricio" }, { nombre: "Mauritania" },
    { nombre: "México" }, { nombre: "Micronesia" }, { nombre: "Moldavia" }, { nombre: "Mónaco" },
    { nombre: "Mongolia" }, { nombre: "Montenegro" }, { nombre: "Mozambique" }, { nombre: "Namibia" },
    { nombre: "Nauru" }, { nombre: "Nepal" }, { nombre: "Nicaragua" }, { nombre: "Níger" },
    { nombre: "Nigeria" }, { nombre: "Noruega" }, { nombre: "Nueva Zelanda" }, { nombre: "Omán" },
    { nombre: "Países Bajos" }, { nombre: "Pakistán" }, { nombre: "Palaos" }, { nombre: "Panamá" },
    { nombre: "Papúa Nueva Guinea" }, { nombre: "Paraguay" }, { nombre: "Perú" }, { nombre: "Polonia" },
    { nombre: "Portugal" }, { nombre: "Reino Unido" }, { nombre: "República Centroafricana" }, { nombre: "República Checa" },
    { nombre: "República del Congo" }, { nombre: "República Democrática del Congo" }, { nombre: "República Dominicana" }, { nombre: "Ruanda" },
    { nombre: "Rumania" }, { nombre: "Rusia" }, { nombre: "Samoa" }, { nombre: "San Cristóbal y Nieves" },
    { nombre: "San Marino" }, { nombre: "San Vicente y las Granadinas" }, { nombre: "Santa Lucía" }, { nombre: "Santo Tomé y Príncipe" },
    { nombre: "Senegal" }, { nombre: "Serbia" }, { nombre: "Seychelles" }, { nombre: "Sierra Leona" },
    { nombre: "Singapur" }, { nombre: "Siria" }, { nombre: "Somalia" }, { nombre: "Sri Lanka" },
    { nombre: "Sudáfrica" }, { nombre: "Sudán" }, { nombre: "Sudán del Sur" }, { nombre: "Suecia" },
    { nombre: "Suiza" }, { nombre: "Surinam" }, { nombre: "Tailandia" }, { nombre: "Tanzania" },
    { nombre: "Tayikistán" }, { nombre: "Timor Oriental" }, { nombre: "Togo" }, { nombre: "Tonga" },
    { nombre: "Trinidad y Tobago" }, { nombre: "Túnez" }, { nombre: "Turkmenistán" }, { nombre: "Turquía" },
    { nombre: "Tuvalu" }, { nombre: "Ucrania" }, { nombre: "Uganda" }, { nombre: "Uruguay" },
    { nombre: "Uzbekistán" }, { nombre: "Vanuatu" }, { nombre: "Vaticano" }, { nombre: "Venezuela" },
    { nombre: "Vietnam" }, { nombre: "Yemen" }, { nombre: "Yibuti" }, { nombre: "Zambia" },
    { nombre: "Zimbabue" }
  ];

  @ViewChild('tripulanteForm', { static: true }) tripulanteForm: NgForm | undefined;
  selectedFile: File | null = null;
  public title: string = "Tripulantes";
  public numeroDocumento: string = '';
  public option: string = '';
  public tituloConfirmacion: string = '';
  public formStatus: boolean = false;
  rol: number | null = null;
  public embarcacion : number = 0;


  public selectedTripulante: Tripulante = {
    tipoDocumento: 0,
    numeroDocumento: '',
    nombre: '',
    apellidos: '',
    nacionalidad: '',
    genero: 0,
    fechaNacimiento: new Date(),
    paisNacimiento: '',
    lugarNacimiento: '',
    fechaExpeDocumento: new Date(),
    fechaCadDocumento: new Date(),
    embarcacion: 0,
    documentoUrl: ''
  };

  constructor(private http: HttpClient,
    private _aroute: ActivatedRoute,
    private _route: Router,

    private _transitosService: TransitosService,
    private _appService: AppService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    
    this._aroute.params.subscribe(params => {
      this.numeroDocumento = params['numeroDocumento'];
      this.option = params['option'];
      this.embarcacion = params['embarcacion'];

      this.tituloConfirmacion = this.createTitle(params['option']);
      if (this.numeroDocumento) {
        this.getSelectedTripulante(this.numeroDocumento);
      }
    });
  }


  createTitle(option: string) {
    switch (option) {
      case 'Insert':
        return "Insertando un nuevo tripulante en la embarcación - " + this.embarcacion;
      case 'Update':
        return "Actualizando al tripulante - " + this.numeroDocumento + " de la embarcación - "  + this.embarcacion;
      case 'Delete':
        return "Eliminando al tripulante - " + this.numeroDocumento+ " de la embarcación - "  + this.embarcacion;
      default:
        return "";
    }
  }

  private getSelectedTripulante(numeroDocumento: string) {
    this._transitosService.getTripulante(numeroDocumento).subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.selectedTripulante = response.data[0];
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el usuario');
      }
    });
  }

  manageForm() {
    //console.log(this.selectedUser);
    switch (this.option) {
      case 'Insert':
        this.insertNewTripulante();
        break;
      case 'Update':
        this.updateTripulante();
        break;
      case 'Delete':
        this.deleteTripulante();
        break;
      case 'Habilitar':
        this.updateTripulante();
        break;
      default:
        this.toastr.error(
          'El formulario tiene campos inválidos',
          'Error de validación'
        );
        this._route.navigate(['/tripulantes']);
        break;
    }
  }

  insertNewTripulante() {
    let formData = this.crearFormulario();
    console.log('FormData' + formData);
    
    this._transitosService
      .insertNewTripulante(formData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha añadido a ' + this.selectedTripulante.nombre,
              'Tripulante agregado correctamente!', { positionClass: 'toast-top-right' }
            );
            this.resetForm();
            this._route.navigate(['/tripulantes']);
          } else {
            this.toastr.error(
              response.message
            );
          }
        },
        error: (error) => {
          this.toastr.error(
            error.message
          );
        }
      });
  }

  updateTripulante() {
    let formData = this.crearFormulario();
    console.log('FormData' + formData);

    this._transitosService
      .updateTripulante(this.numeroDocumento, formData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha actualizado a ' + this.selectedTripulante.nombre,
              'Tripulante actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            this._route.navigate(['/tripulantes']);
          } else {
            this.toastr.error(
              response?.message
            );
          }
        },
        error: (error) => {
          this.toastr.error(
            error.message
          );
        }
      });
  }

  deleteTripulante() {
    this._transitosService
      .deleteTripulante(this.selectedTripulante.numeroDocumento)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            // this.deleteDocumento();
            this.toastr.success(
              'Se ha eliminado a ' + this.selectedTripulante.nombre,
              'Tripulante actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            this.resetForm();
            this._route.navigate(['/tripulantes']);
          } else {
            this.toastr.error(
              response.message
            );
          }
        },
        error: (error) => {
          this.toastr.error(
            error.message
          );
        }
      });
  }

  cancelForm(event: Event): void {
    this.resetForm();
    event.preventDefault();
    this._route.navigate(['/tripulantes'], { queryParams: {} });
  }

  changedForm(): void {
    this.formStatus = !this.formStatus;
  }

  resetForm(): void {
    Object.assign(this.selectedTripulante, {
      tipoDocumento: '',
      numeroDocumento: '',
      nombre: '',
      apellidos: '',
      nacionalidad: '',
      genero: 0,
      fechaNacimiento: new Date(),
      paisNacimiento: '',
      lugarNacimiento: '',
      fechaExpeDocumento: new Date(),
      fechaCadDocumento: new Date(),
    });
    if (this.tripulanteForm) {
      this.tripulanteForm.resetForm();
    }
  }

  canDeactivateForm(): boolean {
    if (this.formStatus) {
      return confirm(
        'Tienes cambios sin registrar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }

  seleccionarDocumento(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = this.prepararDocumento(inputElement.files[0]);
      console.log("Archivo seleccionado:", this.selectedFile);
    } else {
      console.warn('No se seleccionó ningún archivo.');
    }
  }

  prepararDocumento(file: File) {
    let nombreFichero = file.name;
    let extension = nombreFichero.split('.').pop();
    let nuevoNombreFichero = 'tripulante_' + this.selectedTripulante.numeroDocumento + '.' + extension;
    let renamedFile = new File([file], nuevoNombreFichero, { type: file.type });
    console.log('Nombre del fichero: ' + renamedFile.name);
    return renamedFile;
  }

  crearFormulario() {
    let formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
      console.log("Archivo añadido al FormData: ", this.selectedFile);
    } else {
      console.warn("No se seleccionó ningún archivo.");
    }
    formData.append('tripulante', JSON.stringify(this.selectedTripulante));
    console.log("Tripulante añadido al FormData: ", this.selectedTripulante);
    console.log("Datos a enviar:", formData);
    return formData;
  }

  // deleteDocumento() {
  //   this._transitosService.deleteDocument(this.selectedTripulante.numeroDocumento).subscribe(response => {
  //     console.log('Respuesta del servidor:', response);
  //   });
  // }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
