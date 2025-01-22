import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
})
export class RoomBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  availableEquipments = [
    { name: 'projecteur', label: 'Projecteur' },
    { name: 'tableauBlanc', label: 'Tableau Blanc' },
    { name: 'internet', label: 'Connexion Internet' },
    { name: 'microphone', label: 'Microphone' },
  ];
  formInvalidError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bookingForm = this.fb.group({
      roomName: ['', Validators.required],
      reservationDate: ['', [Validators.required, this.futureDateValidator]],
      startTime: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      participants: ['', [Validators.required, Validators.max(50)]],
      equipments: this.fb.group({
        projecteur: [false],
        tableauBlanc: [false],
        internet: [false],
        microphone: [false],
      }),
    });
  }

  futureDateValidator(control: any): any {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const controlDate = new Date(control.value);
    return controlDate.getTime() > today.getTime() ? null : { notFuture: true };
  }

  getSelectedEquipments(): string[] {
    const equipmentsGroup = this.bookingForm.get('equipments') as FormGroup;
    return Object.keys(equipmentsGroup.controls).filter(
      (key) => equipmentsGroup.controls[key].value
    );
  }

  onSubmit(): void {
    const selectedEquipments = this.getSelectedEquipments();
    if (selectedEquipments.length === 0) {
      alert('Veuillez sélectionner au moins un équipement.');
      return;
    }

    if (this.bookingForm.valid) {
      console.log('Données de réservation :', {
        ...this.bookingForm.value,
        selectedEquipments,
      });
      this.bookingForm.reset();
      this.formInvalidError = false;
    } else {
      this.formInvalidError = true;
    }
  }
}
