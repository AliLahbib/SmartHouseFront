import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../../../services/device.service';
import { PieceService } from '../../../services/piece.service'; // Pour récupérer les pièces
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../../../models/device.model';
import { Piece } from '../../../models/piece.model';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;
  deviceId: string | null = null;
  isEditing = false;
  pieces: Piece[]=[];
  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private pieceService: PieceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.deviceForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      room: [''], // Ajout de la pièce
      specificParams: this.fb.group({
        color: [''],
        powerConsumption: [0, [Validators.required, Validators.min(0)]],
      }),
    });
  }


  ngOnInit(): void {
    // Charger les pièces pour le sélecteur
    this.loadPieces();

    // Mode édition
    this.deviceId = this.route.snapshot.paramMap.get('id');
    if (this.deviceId) {
      this.isEditing = true;
      this.deviceService.getDeviceById(this.deviceId).subscribe((device) => {
        this.deviceForm.patchValue({
          name: device.name,
          type: device.type,
          room: device.room?._id || '', // Charger l'ID de la pièce
          specificParams: {
            color: device.specificParams?.color || '',
            powerConsumption: device.specificParams?.powerConsumption || 0,
          },
        });
      });
    }
  }

  loadPieces(): void {
    this.pieceService.getPieces().subscribe((pieces) => {
      this.pieces = pieces;
    });
  }
  onSubmit(): void {
    if (this.deviceForm.valid) {
      const deviceData = { ...this.deviceForm.value };

      if (this.isEditing && this.deviceId) {
        this.deviceService.updateDevice(this.deviceId, deviceData).subscribe(() => {
          this.router.navigate(['/devices']);
        });
      } else {
        this.deviceService.createDevice(deviceData).subscribe(() => {
          this.router.navigate(['/devices']);
        });
      }
    }
  }

}
